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
    Box,
    Autocomplete,
} from '@mui/material';
import {
    createUserSchema,
    updateUserSchema,
} from '../../domain/schemas/users.schemas';
import type { UserDto } from '../../domain/dto/users.dto';
import { createUser, updateUser, getRoles } from '../../infrastructure/services/users.service';

interface UserFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: UserDto | null;
}

export const UserFormDialog: React.FC<UserFormDialogProps> = ({
    open,
    onClose,
    onSuccess,
    initialData,
}) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [availableRoleNames, setAvailableRoleNames] = useState<string[]>(['SUPER_ADMIN', 'ADMIN', 'USER']);
    const isEdit = Boolean(initialData);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<any>({
        resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
        defaultValues: {
            email: '',
            passwordRaw: '',
            firstName: '',
            lastName: '',
            roles: ['USER'],
        },
    });

    useEffect(() => {
        getRoles()
            .then((roles) => {
                if (roles && roles.length > 0) {
                    setAvailableRoleNames(roles.map((r) => r.name));
                }
            })
            .catch((err) => console.error('Failed to load roles for autocomplete', err));
    }, []);

    useEffect(() => {
        if (open) {
            setServerError(null);
            if (initialData) {
                reset({
                    email: initialData.email,
                    passwordRaw: '',
                    firstName: initialData.firstName,
                    lastName: initialData.lastName,
                    roles: initialData.roles && initialData.roles.length > 0 ? initialData.roles : ['USER'],
                });
            } else {
                reset({
                    email: '',
                    passwordRaw: '',
                    firstName: '',
                    lastName: '',
                    roles: ['USER'],
                });
            }
        }
    }, [open, initialData, reset]);

    const onSubmit = async (values: any) => {
        setServerError(null);
        try {
            if (isEdit && initialData) {
                const payload: any = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    roles: values.roles,
                };
                if (values.email && values.email !== initialData.email) {
                    payload.email = values.email;
                }
                if (values.passwordRaw && values.passwordRaw.trim() !== '') {
                    payload.passwordRaw = values.passwordRaw;
                }
                await updateUser(initialData.id, payload);
            } else {
                await createUser({
                    email: values.email,
                    passwordRaw: values.passwordRaw,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    roles: values.roles,
                });
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                (isEdit ? 'Failed to update user' : 'Failed to create user');
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
                    {isEdit ? 'Edit User' : 'Create New User'}
                </DialogTitle>

                <DialogContent sx={{ px: 2.5, pt: 1 }}>
                    {serverError && (
                        <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setServerError(null)}>
                            {serverError}
                        </Alert>
                    )}

                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="user-firstname"
                                        label="First Name"
                                        required
                                        fullWidth
                                        autoFocus
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message as string}
                                    />
                                )}
                            />

                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        id="user-lastname"
                                        label="Last Name"
                                        required
                                        fullWidth
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message as string}
                                    />
                                )}
                            />
                        </Box>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="user-email"
                                    label="Email Address"
                                    type="email"
                                    required={!isEdit}
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message as string}
                                />
                            )}
                        />

                        <Controller
                            name="passwordRaw"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="user-password"
                                    label={isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
                                    type="password"
                                    required={!isEdit}
                                    fullWidth
                                    error={!!errors.passwordRaw}
                                    helperText={errors.passwordRaw?.message as string}
                                />
                            )}
                        />

                        <Controller
                            name="roles"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    multiple
                                    id="user-roles-autocomplete"
                                    options={availableRoleNames}
                                    value={field.value || []}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Assigned Roles"
                                            placeholder="Select roles..."
                                            required={!isEdit}
                                            error={!!errors.roles}
                                            helperText={
                                                (errors.roles?.message as string) ||
                                                'Select one or more roles for this user'
                                            }
                                        />
                                    )}
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
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserFormDialog;
