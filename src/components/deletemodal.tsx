'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteModalProps {
    onDelete: () => void;
    title: string;
    description: string;
    loading?: boolean;
    triggerText?: string;
    triggerVariant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    triggerIcon?: boolean;
}

export function DeleteModal({
    onDelete,
    title,
    description,
    loading: externalLoading,
    triggerText = 'Delete',
    triggerVariant = 'destructive',
    triggerIcon = true,
}: DeleteModalProps) {
    const [open, setOpen] = useState(false);
    const [internalLoading, setInternalLoading] = useState(false);

    const isLoading = externalLoading || internalLoading;

    const handleDelete = async () => {
        try {
            setInternalLoading(true);
            await onDelete();
            setOpen(false);
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={triggerVariant}>
                    {triggerIcon && <Trash2 className="mr-2 h-4 w-4" />}
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-destructive">
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
