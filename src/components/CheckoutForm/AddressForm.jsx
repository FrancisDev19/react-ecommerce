import { Box, Heading, Text, Grid, SimpleGrid, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

import { commerce } from "../../lib/commerce";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol}) `,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <Box py={10}>
      <Heading variant="h4" size="md">
        Shipping Address
      </Heading>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            templateRows="repeat(3, 1fr)"
            gap={4}
          >
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="City" label="City" />
            <FormInput name="ZIP" label="ZIP / Postal code" />
          </Grid>
          <SimpleGrid columns={[1, 2]} alignItems="center" pt={4}>
            <Text pb={4}> Shipping Address </Text>
            <Select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              isFullWidth
            >
              {countries.map(({ id, label }) => (
                <option key={id} value={id}>
                  {" "}
                  {label}{" "}
                </option>
              ))}
            </Select>
          </SimpleGrid>
          <SimpleGrid columns={[1, 2]} alignItems="center" pt={4}>
            <Text pb={4}> Shipping Subdivision </Text>
            <Select
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}
              isFullWidth
            >
              {subdivisions.map(({ id, label }) => (
                <option key={id} value={id}>
                  {" "}
                  {label}{" "}
                </option>
              ))}
            </Select>
          </SimpleGrid>
          <SimpleGrid columns={[1, 2]} alignItems="center" pt={4}>
            <Text pb={4}> Shipping Options </Text>
            <Select value={shippingOption} onChange={(e) => shippingOptions(e.target.value)} isFullWidth>
              {options.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
          </SimpleGrid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddressForm;
