import { Box, Button, Container, Heading, Input, VStack, Text } from "@chakra-ui/react";
import { appToaster } from "../toaster";
import { useState } from "react";
import { useProductStore } from "../Store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		setIsLoading(true);
		const { success, message } = await createProduct(newProduct);
		setIsLoading(false);
		
		if (!success) {
			appToaster.create({ title: "Error", description: message, type: "error" });
		} else {
			appToaster.create({ title: "Success", description: message, type: "success" });
			setNewProduct({ name: "", price: "", image: "" });
			setTimeout(() => navigate("/"), 1000);
		}
	};

	return (
		<Box minH="calc(100vh - 64px)" bg="gray.50" py={{ base: 8, md: 12 }}>
			<Container maxW={"container.md"} px={{ base: 4, md: 6 }}>
				<VStack spacing={8} align="stretch">
					<Box textAlign="center">
						<Heading 
							as={"h1"} 
							bgImage={"linear-gradient(to right, rgb(0, 212, 254), rgb(17, 0, 248))"}
							bgClip={"text"}
							sx={{ WebkitTextFillColor: "transparent" }}
							size={{ base: "xl", md: "2xl" }}
							mb={2}
						>
							Create New Product
						</Heading>
						<Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
							Add a new product to your store
						</Text>
					</Box>

					<Box 
						w={"full"} 
						bg={"white"} 
						p={{ base: 6, md: 8 }} 
						rounded={"xl"} 
						shadow={"lg"}
						borderWidth="1px"
						borderColor="gray.200"
					>
						<VStack spacing={6}>
							<Box w="full">
								<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
									Product Name
								</Text>
								<Input
									placeholder='Enter product name'
									name='name'
									value={newProduct.name}
									onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
									size="lg"
									focusBorderColor="blue.500"
									_hover={{ borderColor: "gray.400" }}
								/>
							</Box>

							<Box w="full">
								<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
									Price
								</Text>
								<Input
									placeholder='Enter price'
									name='price'
									type='number'
									value={newProduct.price}
									onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
									size="lg"
									focusBorderColor="blue.500"
									_hover={{ borderColor: "gray.400" }}
								/>
							</Box>

							<Box w="full">
								<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">
									Image URL
								</Text>
								<Input
									placeholder='Enter image URL'
									name='image'
									value={newProduct.image}
									onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
									size="lg"
									focusBorderColor="blue.500"
									_hover={{ borderColor: "gray.400" }}
								/>
							</Box>

							<Button 
								colorScheme='blue' 
								onClick={handleAddProduct} 
								w='full'
								size="lg"
								mt={4}
								isLoading={isLoading}
								loadingText="Creating..."
								_hover={{ transform: "translateY(-2px)", shadow: "lg" }}
								transition="all 0.2s"
							>
								Add Product
							</Button>
						</VStack>
					</Box>
				</VStack>
			</Container>
		</Box>
	);
};
export default CreatePage;