"use client";

import { Trash } from "lucide-react";
import { Color } from "@prisma/client";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

interface ColorsFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(4)
    .max(7)
    .regex(
      RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$"),
      "Value does not match HexCode for color",
    ),
});

type ColorsFormValue = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData
    ? "Edit an existing Color"
    : "Add a new Color";
  const toastMessage = initialData ? "Color Updated." : "Added a new Color.";
  const actionMessage = initialData ? "Update" : "Create";

  const onSubmit = async (data: ColorsFormValue) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/stores/${params.storeId}/colors/${params.colorId}`,
          data,
        );
      } else {
        await axios.post(`/api/stores/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    router.push(`/${params.storeId}/colors`);
  };

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/colors/${params.colorId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color Deleted");
    } catch (error) {
      toast.error(
        "Make sure all the products associated with the Color is deleted first!",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const form = useForm<ColorsFormValue>({
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
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color Name"
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
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color Value"
                        {...field}
                      />
                      <div
                        className="rounded-full p-4 border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
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
