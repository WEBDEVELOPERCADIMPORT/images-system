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
import { folderFormSchema, type FolderFormValues } from '../../domain/schemas/folders.schemas';
import type { FolderDto } from '../../domain/dto/folders.dto';
import { createFolder, updateFolder } from '../../infrastructure/services/folders.service';

interface FolderFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    brandId: string;
    parentId?: string | null;
    initialData?: FolderDto | null;
}

export const FolderFormDialog: React.FC<FolderFormDialogProps> = ({
    open,
    onClose,
    onSuccess,
    brandId,
    parentId,
    initialData,
}) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const isEdit = Boolean(initialData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FolderFormValues>({
        resolver: zodResolver(folderFormSchema),
        defaultValues: {
            name: '',
            description: '',
            parentId: parentId ?? null,
        },
    });

    useEffect(() => {
        if (open) {
            setServerError(null);
            if (initialData) {
                reset({
                    name: initialData.name,
                    description: initialData.description ?? '',
                    parentId: initialData.parentId,
                });
            } else {
                reset({
                    name: '',
                    description: '',
                    parentId: parentId ?? null,
                });
            }
        }
    }, [open, initialData, parentId, reset]);

    const onSubmit = async (values: FolderFormValues) => {
        setServerError(null);
        try {
            if (isEdit && initialData) {
                await updateFolder(initialData.id, {
                    name: values.name,
                    description: values.description,
                });
            } else {
                await createFolder({
                    name: values.name,
                    description: values.description,
                    brandId,
                    parentId: parentId ?? null,
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                (isEdit ? 'Failed to update folder' : 'Failed to create folder');
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
                    {isEdit ? 'Edit Folder' : 'New Folder'}
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
                                    id="folder-name"
                                    label="Folder Name"
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
                                    id="folder-description"
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
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update Folder' : 'Create Folder'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FolderFormDialog;
