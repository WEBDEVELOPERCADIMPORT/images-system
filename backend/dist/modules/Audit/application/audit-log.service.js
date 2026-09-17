const SENSITIVE_KEYS = new Set([
    "password",
    "passwordhash",
    "passwordraw",
    "token",
    "accesstoken",
    "refreshtoken",
    "secret",
    "authorization",
    "cookie",
    "credentials",
    "apikey",
    "sessionid"
]);
export class AuditLogService {
    auditRepository;
    constructor(auditRepository) {
        this.auditRepository = auditRepository;
    }
    /**
     * Safely serializes objects, removing sensitive information, converting BigInts,
     * and handling circular structures or Dates.
     */
    sanitize(value, depth = 0) {
        if (value === null || value === undefined) {
            return value;
        }
        if (typeof value === "bigint") {
            return Number(value);
        }
        if (value instanceof Date) {
            return value.toISOString();
        }
        if (typeof value !== "object" || depth > 6) {
            return value;
        }
        if (Array.isArray(value)) {
            return value.map(item => this.sanitize(item, depth + 1));
        }
        const sanitized = {};
        for (const [key, val] of Object.entries(value)) {
            const lowerKey = key.toLowerCase();
            if (SENSITIVE_KEYS.has(lowerKey) || lowerKey.includes("password") || lowerKey.includes("secret") || lowerKey.includes("token")) {
                continue; // Skip sensitive fields completely
            }
            sanitized[key] = this.sanitize(val, depth + 1);
        }
        return sanitized;
    }
    /**
     * Computes the differences between before and after states.
     */
    calculateDiff(beforeState, afterState) {
        const cleanBefore = this.sanitize(beforeState) || {};
        const cleanAfter = this.sanitize(afterState) || {};
        const allKeys = new Set([...Object.keys(cleanBefore), ...Object.keys(cleanAfter)]);
        const changes = {};
        for (const key of allKeys) {
            // Ignore timestamps from diffing if unwanted
            if (key === "updatedAt" || key === "createdAt")
                continue;
            const valBefore = cleanBefore[key];
            const valAfter = cleanAfter[key];
            const strBefore = JSON.stringify(valBefore ?? null);
            const strAfter = JSON.stringify(valAfter ?? null);
            if (strBefore !== strAfter) {
                changes[key] = {
                    from: valBefore !== undefined ? valBefore : null,
                    to: valAfter !== undefined ? valAfter : null
                };
            }
        }
        return {
            before: cleanBefore,
            after: cleanAfter,
            changes
        };
    }
    /**
     * Records an audit log entry in the repository.
     * Guaranteed to never throw errors to avoid breaking the calling business transaction.
     */
    async record(params) {
        try {
            const resource = (params.resource || "system").toLowerCase().trim();
            const userId = params.userId ?? params.context?.userId ?? null;
            const resourceId = params.resourceId ?? null;
            // Base technical request details
            const requestInfo = {};
            if (params.context) {
                if (params.context.ip)
                    requestInfo.ip = params.context.ip;
                if (params.context.userAgent)
                    requestInfo.userAgent = params.context.userAgent;
                if (params.context.method)
                    requestInfo.method = params.context.method;
                if (params.context.path)
                    requestInfo.path = params.context.path;
            }
            const mergedDetails = {
                ...requestInfo,
                timestamp: new Date().toISOString()
            };
            // Calculate diff if before or after provided
            if (params.before !== undefined || params.after !== undefined) {
                const diff = this.calculateDiff(params.before, params.after);
                mergedDetails.before = diff.before;
                mergedDetails.after = diff.after;
                mergedDetails.changes = diff.changes;
            }
            // Merge any extra details provided
            if (params.details && typeof params.details === "object") {
                const cleanExtraDetails = this.sanitize(params.details);
                Object.assign(mergedDetails, cleanExtraDetails);
            }
            return await this.auditRepository.create({
                userId,
                action: params.action,
                resource,
                resourceId,
                details: mergedDetails
            });
        }
        catch (error) {
            console.error(`[AuditLogService] Failed to record audit log for action ${params.action} on ${params.resource}:`, error);
            return null;
        }
    }
}
//# sourceMappingURL=audit-log.service.js.map