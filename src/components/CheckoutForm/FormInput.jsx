import { Box, Input } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
  const {control} = useFormContext();
  return (
    <Box pt={4}>
      <Controller
        control={control}
        name={name}
        label={label}
        required
        render={({field: {name, value, ref}}) => (
          <Input size="lg" placeholder={label} value={value} ref={ref} />
        )}
      />
    </Box>
  );
};

export default FormInput;
