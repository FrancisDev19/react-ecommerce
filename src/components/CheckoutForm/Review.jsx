import {Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Stat, StatLabel, StatNumber} from '@chakra-ui/react'

const Review = ({checkoutToken}) => {
    return (
        <Box py={10}>
            <Heading as="h6" pb={4}>Order Summary</Heading>
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        <Th>Article</Th>
                        <Th>Quantity</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {
                    checkoutToken.live.line_items.map((product) => (
                        <Tr>
                            <Td> {product.name} </Td>
                            <Td> {product.quantity} </Td>
                        </Tr>
                    ))
                }
                </Tbody>
            </Table>
            <Stat pt={5}>
                <StatLabel>Total</StatLabel>
                <StatNumber>{checkoutToken.live.subtotal.formatted_with_symbol}</StatNumber>
            </Stat>
        </Box>
    )
}

export default Review
