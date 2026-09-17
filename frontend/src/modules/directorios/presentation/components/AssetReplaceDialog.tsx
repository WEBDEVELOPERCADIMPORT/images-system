import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
    Box,
} from '@mui/material';
import { Close, SwapHoriz } from '@mui/icons-material';
import FileInputZone from '../../../../shared/components/common/FileInputZone';
import { updateAsset } from '../../infrastructure/services/assets.service';
import type { AssetDto } from '../../domain/dto/assets.dto';

interface AssetReplaceDialogProps {
    asset: AssetDto | null;
    open: boolean;
    onClose: () => void;
    onSuccess: (updatedAsset: AssetDto) => void;
}

export const AssetReplaceDialog: React.FC<AssetReplaceDialogProps> = ({
    asset,
    open,
    onClose,
    onSuccess,
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!asset) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!file) {
            setErrorMessage('Please select a new file to replace the existing one.');
            return;
        }

        setIsSubmitting(true);
        try {
            const updated = await updateAsset(asset.id, { file });
            handleClose();
            onSuccess(updated);
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to replace file in Cloudflare R2.';
            setErrorMessage(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
        setFile(null);
        setErrorMessage(null);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '16px',
                        p: 1,
                    },
                },
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SwapHoriz color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px' }}>
                        Replace Asset File
                    </Typography>
                </Box>
                <IconButton size="small" onClick={handleClose} disabled={isSubmitting}>
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 1 }}>
                    <Stack spacing={2}>
                        <Alert severity="info" sx={{ borderRadius: '10px', fontSize: '13px' }}>
                            Replacing the file will overwrite the object in Cloudflare R2 while preserving the exact
                            same public URL: <strong>{asset.url}</strong>
                        </Alert>

                        {errorMessage && (
                            <Alert severity="error" sx={{ borderRadius: '10px' }}>
                                {errorMessage}
                            </Alert>
                        )}

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Currently replacing file for asset: <strong>{asset.name}</strong> ({asset.fileName})
                        </Typography>

                        <FileInputZone
                            file={file}
                            onChange={setFile}
                            disabled={isSubmitting}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
                    <Button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        sx={{ textTransform: 'none', borderRadius: '10px', color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !file}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <SwapHoriz />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        {isSubmitting ? 'Replacing in R2...' : 'Confirm Replacement'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AssetReplaceDialog;
