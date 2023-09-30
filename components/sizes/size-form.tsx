"use client";

import { Trash } from "lucide-react";
import { Size } from "@prisma/client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUpload } from "../ui/image-upload";

interface SizesFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizesFormValue = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizesFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit an existing Size" : "Add a new Size";
  const toastMessage = initialData ? "Size Updated." : "Added a new Size.";
  const actionMessage = initialData ? "Update" : "Create";

  const onSubmit = async (data: SizesFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/sizes/${params.sizeId}`,
          data,
        );
      } else {
        await axios.post(`/api/stores/${params.storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push(`/${params.storeId}/sizes`);
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size Deleted");
    } catch (error) {
      toast.error(
        "Make sure all the products associated with the Size is deleted first!",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const form = useForm<SizesFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteConfirm}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size Value"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button disabled={loading} type="submit">
              {actionMessage}
            </Button>
            <Button disabled={loading} variant="destructive" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
