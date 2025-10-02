import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import { appToaster } from "../../toaster";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useProductStore } from "../../Store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	
	const fallbackImage =
		"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'>\
  <rect width='800' height='400' fill='%23e2e8f0'/>\
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, Helvetica, sans-serif' font-size='32'>Image unavailable</text>\
</svg>";

	const { deleteProduct, updateProduct } = useProductStore();

	const handleDeleteProduct = async (pid) => {
		setIsLoading(true);
		const { success, message } = await deleteProduct(pid);
		setIsLoading(false);
		if (!success) {
			appToaster.create({ title: "Error", description: message, type: "error" });
		} else {
			appToaster.create({ title: "Success", description: message, type: "success" });
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		setIsLoading(true);
		const { success, message } = await updateProduct(pid, updatedProduct);
		setIsLoading(false);
		setIsOpen(false);
		if (!success) {
			appToaster.create({ title: "Error", description: message, type: "error" });
		} else {
			appToaster.create({ title: "Success", description: "Product updated successfully", type: "success" });
		}
	};

	const handleEditClick = () => {
		setUpdatedProduct(product);
		setIsOpen(true);
	};

	return (
		<Box
			shadow='md'
			rounded='xl'
			overflow='hidden'
			borderWidth='1px'
			borderColor='gray.200'
			transition='all 0.3s ease'
			_hover={{ transform: "translateY(-8px)", shadow: "2xl" }}
			bg="blue.100"
			display="flex"
			flexDirection="column"
			h="full"
		>
			<Box 
				bg="gray.50" 
				p={4}
				display="flex"
				alignItems="center"
				justifyContent="center"
				h="240px"
			>
				<Image
					src={product.image}
					alt={product.name}
					maxH="100%"
					maxW="100%"
					objectFit='contain'
					loading='lazy'
					rounded="md"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = fallbackImage;
					}}
				/>
			</Box>

			<Box p={6} flex="1" display="flex" flexDirection="column">
				<Heading 
					as='h3' 
					size='md' 
					mb={3} 
					noOfLines={2}
					minH="60px"
					color="gray.800"
				>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='2xl' color="blue.600" mb={4}>
					${product.price}
				</Text>

				<HStack spacing={3} mt="auto">
					<IconButton
						onClick={handleEditClick}
						colorScheme='blue'
						aria-label='Edit product'
						size="md"
						flex="1"
						_hover={{ transform: "scale(1.05)" }}
						transition="all 0.2s"
					>
						<AiOutlineEdit size={20} />
					</IconButton>
					<IconButton 
						colorScheme='red' 
						onClick={() => handleDeleteProduct(product._id)}
						aria-label='Delete product'
						size="md"
						flex="1"
						isLoading={isLoading}
						_hover={{ transform: "scale(1.05)" }}
						transition="all 0.2s"
					>
						<AiOutlineDelete size={20} />
					</IconButton>
				</HStack>
			</Box>
			
			{isOpen && (
				<Box p={4} bg="white" borderTopWidth="1px" borderColor="gray.200">
					<Heading as="h4" size="sm" mb={3} color="gray.800">Update Product</Heading>
					<VStack spacing={4} maxH="60vh" overflowY="auto" px={1}>
						<Box w="full">
							<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">Product Name</Text>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct?.name ?? ''}
								onChange={(e) => setUpdatedProduct((prev) => ({ ...prev, name: e.target.value }))}
								size="sm"
								_focus={{ borderColor: "blue.500" }} tabIndex={0}
							/>
						</Box>
						<Box w="full">
							<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">Price</Text>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct?.price ?? ''}
								onChange={(e) => setUpdatedProduct((prev) => ({ ...prev, price: e.target.value }))}
								size="sm"
								_focus={{ borderColor: "blue.500" }} tabIndex={0}
							/>
						</Box>
						<Box w="full">
							<Text mb={2} fontWeight="medium" fontSize="sm" color="gray.700">Image URL</Text>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct?.image ?? ''}
								onChange={(e) => setUpdatedProduct((prev) => ({ ...prev, image: e.target.value }))}
								size="sm"
								_focus={{ borderColor: "blue.500" }} tabIndex={0}
							/>
						</Box>
					</VStack>
					<HStack spacing={3} mt={3}>
						<Button
							colorScheme='blue'
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
							isLoading={isLoading}
							loadingText="Updating..."
						>
							Update
						</Button>
						<Button variant='outline' onClick={() => setIsOpen(false)}>Cancel</Button>
					</HStack>
				</Box>
			)}
		</Box>
	);
};
export default ProductCard;