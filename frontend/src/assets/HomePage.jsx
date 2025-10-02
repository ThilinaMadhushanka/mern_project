import { Container, SimpleGrid, Text, VStack, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useProductStore } from "../Store/product";
import ProductCard from "../components/ui/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Box minH="calc(100vh - 64px)" bg="blue.50" py={8}>
			<Container maxW='container.xl' px={{ base: 4, md: 6, lg: 8 }}>
				<VStack spacing={8} align="stretch">
					<Text
						fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
						fontWeight={"bold"}
						textTransform={"uppercase"}
						textAlign={"center"}
						bgImage={"linear-gradient(to right, rgb(0, 212, 254), rgb(17, 0, 248))"}
						bgClip={"text"}
						sx={{ WebkitTextFillColor: "transparent" }}
						as={Link}
						to={"/"}
						_hover={{ transform: "scale(1.02)", transition: "all 0.2s" }}
						cursor="pointer"
					>
						Current Products 🚀
					</Text>

					{products.length === 0 ? (
						<Box 
							textAlign="center" 
							py={20}
							bg="blue.50"
							rounded="xl"
							shadow="md"
						>
							<Text fontSize='2xl' fontWeight='bold' color='gray.400' mb={4}>
								No products found 😢
							</Text>
							<Link to={"/create"}>
								<Text 
									as='span' 
									color='blue.500' 
									fontSize="lg"
									fontWeight="semibold"
									_hover={{ textDecoration: "underline", color: "blue.600" }}
								>
									Create your first product
								</Text>
							</Link>
						</Box>
					) : (
						<SimpleGrid
							columns={{
								base: 1,
								sm: 2,
								lg: 3,
								xl: 4,
							}}
							gap={{ base: 4, md: 6, lg: 8 }}
							w={"full"}
						>
							{products.map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
						</SimpleGrid>
					)}
				</VStack>
			</Container>
		</Box>
	);
};
export default HomePage;
