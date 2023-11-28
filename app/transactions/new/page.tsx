"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTransactionSchema } from "@/validations/transactions";
import moment from "moment-timezone";
import { CalendarIcon } from "lucide-react";

const AddTransaction = () => {
  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
      date: moment().toDate(),
      type: "CREDIT",
    },
  });

  function onSubmit(values: z.infer<typeof createTransactionSchema>) {
    console.log({ ...values, date: moment(values.date).valueOf() });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8"
      >
        <div className="w-full max-w-md">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Description
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="number"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Type
                </FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Date
                </FormLabel>
                <br />
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          moment(field.value).format("DD-MM-YYYY")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="font-semibold px-4 py-2 rounded-md w-full mt-4 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-violet-500 hover:to-blue-500"
          >
            Add Expense
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTransaction;
