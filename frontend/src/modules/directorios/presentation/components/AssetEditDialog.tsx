import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Typography,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { updateAsset } from '../../infrastructure/services/assets.service';
import type { AssetDto } from '../../domain/dto/assets.dto';

interface AssetEditDialogProps {
    asset: AssetDto | null;
    open: boolean;
    onClose: () => void;
    onSuccess: (updatedAsset: AssetDto) => void;
}

export const AssetEditDialog: React.FC<AssetEditDialogProps> = ({
    asset,
    open,
    onClose,
    onSuccess,
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (asset) {
            setName(asset.name || '');
            setDescription(asset.description || '');
            setSku(asset.sku || '');
        }
    }, [asset]);

    if (!asset) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!name.trim()) {
            setErrorMessage('Asset name cannot be empty');
            return;
        }

        setIsSubmitting(true);
        try {
            const updated = await updateAsset(asset.id, {
                name: name.trim(),
                description: description.trim() || null,
                sku: sku.trim() || null,
            });
            handleClose();
            onSuccess(updated);
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to update asset information';
            setErrorMessage(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSubmitting) return;
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
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px' }}>
                    Edit Asset Information
                </Typography>
                <IconButton size="small" onClick={handleClose} disabled={isSubmitting}>
                    <Close fontSize="small" />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 1 }}>
                    <Stack spacing={2.5}>
                        {errorMessage && (
                            <Alert severity="error" sx={{ borderRadius: '10px' }}>
                                {errorMessage}
                            </Alert>
                        )}

                        <TextField
                            label="Asset Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            size="small"
                            disabled={isSubmitting}
                            required
                        />

                        <TextField
                            label="SKU"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            placeholder="e.g. HONDA-001"
                            fullWidth
                            size="small"
                            disabled={isSubmitting}
                        />

                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                            size="small"
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
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AssetEditDialog;
