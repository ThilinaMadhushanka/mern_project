import { Button, Container, Flex, HStack, Icon, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AiOutlinePlusSquare } from 'react-icons/ai'

const Navbar = () => {
    return (
        <Box 
            bg="white" 
            shadow="sm" 
            borderBottomWidth="1px" 
            borderColor="gray.200"
            position="sticky"
            top={0}
            zIndex={10}
        >
            <Container maxW={"1140px"} px={{ base: 4, md: 6 }}>
                <Flex
                    h={16}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    flexDir={{
                        base: "row",
                        sm: "row"
                    }}
                    gap={{ base: 2, sm: 4 }}
                >
                    <Text
                        fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        textAlign={{ base: "left", sm: "center" }}
                        bgImage={"linear-gradient(to right, rgb(0, 212, 254), rgb(17, 0, 248))"}
                        bgClip={"text"}
                        sx={{ WebkitTextFillColor: "transparent" }}
                        as={RouterLink}
                        to={"/"}
                        _hover={{ transform: "scale(1.02)", transition: "all 0.2s" }}
                        cursor="pointer"
                        whiteSpace="nowrap"
                    >
                        Product Store 🛒
                    </Text>
                    <HStack spacing={2} alignItems={"center"}>
                        <RouterLink to={"/create"}>
                            <Button 
                                colorScheme="blue"
                                variant="solid"
                                size={{ base: "sm", md: "md" }}
                                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                                transition="all 0.2s"
                            >
                                <Icon as={AiOutlinePlusSquare} display={{ base: "none", md: "block" }} />
                            </Button>
                        </RouterLink>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar
