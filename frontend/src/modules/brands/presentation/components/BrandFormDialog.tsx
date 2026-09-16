import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Alert,
    CircularProgress,
} from '@mui/material';
import { brandFormSchema, type BrandFormValues } from '../../domain/schemas/brands.schemas';
import type { BrandDto } from '../../domain/dto/brands.dto';
import { createBrand, updateBrand } from '../../infrastructure/services/brands.service';

interface BrandFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: BrandDto | null;
}

export const BrandFormDialog: React.FC<BrandFormDialogProps> = ({
    open,
    onClose,
    onSuccess,
    initialData,
}) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const isEdit = Boolean(initialData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<BrandFormValues>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (open) {
            setServerError(null);
            if (initialData) {
                reset({
                    name: initialData.name,
                    description: initialData.description ?? '',
                });
            } else {
                reset({
                    name: '',
                    description: '',
                });
            }
        }
    }, [open, initialData, reset]);

    const onSubmit = async (values: BrandFormValues) => {
        setServerError(null);
        try {
            if (isEdit && initialData) {
                await updateBrand(initialData.id, {
                    name: values.name,
                    description: values.description,
                });
            } else {
                await createBrand({
                    name: values.name ?? '',
                    description: values.description,
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                (isEdit ? 'Failed to update brand' : 'Failed to create brand');
            setServerError(message);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => !isSubmitting && onClose()}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '16px',
                        p: 1,
                        border: '0.5px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    },
                },
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogTitle sx={{ fontWeight: 600, fontSize: '18px', color: 'text.primary', pt: 2, px: 2.5 }}>
                    {isEdit ? 'Edit Brand' : 'New Brand'}
                </DialogTitle>

                <DialogContent sx={{ px: 2.5, pt: 1 }}>
                    {serverError && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}

                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="brand-name"
                                    label="Brand Name"
                                    required
                                    fullWidth
                                    autoFocus
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ''}
                                    id="brand-description"
                                    label="Description (optional)"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ p: 2.5, pt: 1.5, gap: 1 }}>
                    <Button
                        onClick={onClose}
                        disabled={isSubmitting}
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 450,
                            fontSize: '13px',
                            color: 'text.secondary',
                            borderColor: 'divider',
                            px: 2.5,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : undefined}
                        sx={{
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '13px',
                            px: 2.5,
                        }}
                    >
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update Brand' : 'Create Brand'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default BrandFormDialog;
