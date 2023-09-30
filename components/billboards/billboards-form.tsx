"use client";

import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
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

interface BillboardsFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardsFormValue = z.infer<typeof formSchema>;

export const BillboardsForm: React.FC<BillboardsFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create BillBoard";
  const description = initialData
    ? "Edit an existing Billboard"
    : "Add a new Billboard";
  const toastMessage = initialData
    ? "Billboard Updated."
    : "Added a new Billboard.";
  const actionMessage = initialData ? "Update" : "Create";

  const onSubmit = async (data: BillboardsFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
          data,
        );
      } else {
        await axios.post(`/api/stores/${params.storeId}/billboards`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success("Billboard Deleted");
    } catch (error) {
      toast.error(
        "Make sure all the categories associated with the Billboard is deleted first!",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const form = useForm<BillboardsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    values={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Label Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {actionMessage}
          </Button>
        </form>
      </Form>
    </>
  );
};
