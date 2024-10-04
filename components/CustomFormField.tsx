import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./styles/phoneInput.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/customFormField.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-blue-300 bg-blue-50">
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2 my-auto"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="border-0 bg-transparent text-blue-800 placeholder-blue-500 focus:ring-0 focus:ring-offset-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            //@ts-ignore
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="rounded-md border border-blue-300 bg-blue-50 text-blue-800 placeholder-blue-500"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-blue-300 bg-blue-50">
          <Image
            src="/assets/icon/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2 my-auto"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              className="w-full border-0 bg-transparent text-blue-800 placeholder-blue-500 focus:ring-0 focus:ring-offset-0 p-2"
              placeholderText="Select date"
              timeInputLabel="Time:"
              showTimeSelect={props.showTimeSelect ?? false}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full rounded-md border border-blue-300 bg-blue-50 text-blue-800 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="border border-blue-300">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? (
        <div
          className={`rounded-md border border-blue-300 bg-blue-50 ${
            props.name === "gender" ? "p-2 h-[42px] flex items-center" : "p-4"
          }`}
        >
          {props.renderSkeleton(field)}
        </div>
      ) : null;

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-5 w-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor={props.name}
              className="text-sm font-medium text-blue-700 cursor-pointer"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="w-full rounded-md border border-blue-300 bg-blue-50 text-blue-800 placeholder-blue-500 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-y"
            disabled={props.disabled}
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-blue-700">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
