import { Controller } from "react-hook-form";

type DropDownInputProps = {
  control: any;
  options: string[];
  label: string;
  inputKey: string;
};

export const DropDownInput = (props: DropDownInputProps) => {
  const { control, options, label, inputKey } = props;

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <Controller
          name={inputKey}
          control={control}
          render={({ field }) => (
            <select
              id={inputKey}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2.5"
              {...field}
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          )}
        />
      </div>
    </>
  );
};
