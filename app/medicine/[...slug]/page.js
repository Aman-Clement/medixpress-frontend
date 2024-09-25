"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MedicineImages } from "@/components/MedicineData";
import { Card, CardBody, CardFooter, Image, useDisclosure, Button, CardHeader, Divider, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/modal";
import { jwtDecode } from "jwt-decode";

const Page = () => {
    const { slug } = useParams();
    const [searchVal, setSearchVal] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [medicineList, setMedicineList] = useState([]);
    const { onOpenChange } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [cart, setCart] = useState([]);
    const [pharmacies, setPharmacies] = useState({})
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);
    const [customerId, setCustomerId] = useState("")

    const handleCheckoutOpen = () => {
        setCheckoutOpen(true);
    };

    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
    };


    const onOpen = (medicine) => {
        setSelectedMedicine(medicine);
        setIsOpen(true);
    };



    useEffect(() => {
        if (slug && slug.length > 0) {
            const urlPart = slug[0];
            console.log("URL Part:", urlPart);
            setSearchVal(urlPart);
        }
        const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

        let customerId;

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                customerId = decodedToken.customerId;
                console.log("token",decodedToken)
                console.log(customerId) // Adjust this based on your JWT structure
                setCustomerId(customerId)
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [slug]);

    useEffect(() => {
        if (searchVal) {
            fetchMedicines();
            fetchPharmacyDetails();
        }
    }, [searchVal]);

    const fetchMedicines = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            console.log("Token:", token);

            const response = await fetch(`${process.env.BASE_URL}/medicine?medicineName=${searchVal}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Failed to fetch medicines:', errorDetails);
                throw new Error('Failed to Fetch Medicines');
            }

            const data = await response.json();
            console.log("Fetched Data:", data);

            const listWithImages = data.map((item, index) => ({
                ...item,
                img: MedicineImages[index]?.img // Use optional chaining to prevent errors
            }));

            console.log("List with Images:", listWithImages);
            setMedicineList(listWithImages);
        } catch (error) {
            console.error('Error during fetching medicines:', error);
        } finally {
            setIsLoading(false); // Ensure loading state is updated
        }
    };

    const fetchPharmacyDetails = async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/pharmacy`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const pharmacyMap = {};
                data.forEach(pharmacy => {
                    pharmacyMap[pharmacy.pid] = pharmacy; // Store the whole pharmacy object if needed
                });
                setPharmacies(pharmacyMap);
            } else {
                throw new Error('Failed to fetch pharmacy details');
            }
        } catch (error) {
            console.error(error);
            return null; // Handle error appropriately
        }
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedMedicine(null);
        setQuantity(1);
        setSelectedPharmacy(null); // Reset selected pharmacy on close
    };

    const handleAddToCart = () => {
        if (selectedPharmacy) {
            const newItem = {
                medicineName: selectedMedicine.medicineName,
                pharmacyId: selectedPharmacy.pharmacyid,
                pharmacyName : pharmacies[selectedPharmacy.pharmacyid].pname,
                pharmacyCost: selectedPharmacy.pharmacyCost,
                stockId: selectedPharmacy.id,
                quantity: parseInt(quantity, 10),
            };
            setCart([...cart, newItem]); // Add the new item to the cart
            console.log(`Added ${quantity} of ${selectedMedicine.medicineName} from pharmacy ${selectedPharmacy.pharmacyid} to cart.`);
            onClose();
            console.log(cart)
        } else {
            alert("Please select a pharmacy.");
        }
    };

    const totalBill = () => {
        let bill = 0;
        cart.forEach(item => {
            bill += item.pharmacyCost * item.quantity; // Multiply by quantity
        });
        return bill; // Return the total bill
    };

    const placeOrder = async() =>{

        const medicineStockList = cart.map(item => ({
            "id": item.stockId,  
            "quantity": item.quantity
        }));

        console.log("stockList",medicineStockList);
        

        let orderId = 1;
        let paymentStatus = "UNPAID";
        let paymentMethod = "CASH";

        const token = localStorage.getItem('authToken');

        const response = await fetch(`${process.env.BASE_URL}/checkout/process`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ "medicineStockList": medicineStockList, "orderId" : orderId, "paymentStatus" : paymentStatus, "paymentMethod": paymentMethod }),
        })

        console.log("resp", response);
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <div className="mx-16 px-16 pt-16 min-h-screen">
            <div>
                <h4 className="font-bold text-xl text-yellow-900 md:text-3xl">Your search results...</h4>
            </div>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    medicineList.map((item, index) => (
                        <Card shadow="sm" key={index} isPressable onPress={() => onOpen(item)} className="text-black w-72">
                            <Modal isOpen={isOpen} onOpenChange={onClose}>
                                <ModalContent className="text-black">
                                    {selectedMedicine && (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1 text-black">{selectedMedicine.medicineName}</ModalHeader>
                                            <ModalBody>
                                                <Image
                                                    shadow="sm"
                                                    radius="lg"
                                                    width="100%"
                                                    alt={selectedMedicine.medicineName}
                                                    className="w-full object-contain h-[140px]"
                                                    src={selectedMedicine.img}
                                                />
                                                <p>{selectedMedicine.medicineDescription}</p>
                                                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                                                    {selectedMedicine.medicineStocks.map((stock) => (
                                                        <Card
                                                            shadow="sm"
                                                            key={stock.pharmacyId}
                                                            isPressable
                                                            onPress={() => setSelectedPharmacy(stock)} // Set selected pharmacy on card click
                                                            className={`transition duration-200 ease-in-out ${selectedPharmacy?.pharmacyid === stock.pharmacyid ? 'border-2 border-blue-500' : ''}`}
                                                        >
                                                            <CardBody className="overflow-visible p-0">
                                                                <Image
                                                                    shadow="sm"
                                                                    radius="lg"
                                                                    width="100%"
                                                                    alt={stock.pharmacyId}
                                                                    className="w-full object-fit"
                                                                    src="/pharmacy.png" // Update the path if necessary
                                                                />
                                                                <p className="text-orange-main mx-auto pt-1">{pharmacies[stock.pharmacyid].pname}</p>
                                                            </CardBody>
                                                            <Divider />
                                                            <CardFooter className="text-small justify-between">
                                                                <p className="text-default-500">{stock.pharmacyCost}₹</p>
                                                            </CardFooter>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="number"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        placeholder="Qty"
                                                        min="1"
                                                        className="border w-20 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <Button color="primary" onPress={handleAddToCart}>
                                                    <Image src="/cart.png" className="object-contain w-5"/>
                                                    Add to Cart
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
                            
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={item.title}
                                    className="w-full object-contain h-[140px]"
                                    src={item.img}
                                />
                            </CardBody>
                            <CardFooter className="text-small text-black justify-between">
                                <b>{item.medicineName}</b>
                                <p className="text-default-500">{item.price}</p>
                            </CardFooter>
                        </Card>
                    )))}
            </div>
            {!cart?.length?(<></>):(<div>
            <Button onPress={handleCheckoutOpen} className="fixed bottom-20 right-20 z-50 cursor-pointer bg-orange-main">
                Checkout
            </Button>
            <Modal isOpen={isCheckoutOpen} onOpenChange={handleCheckoutClose}>
                <ModalContent className="text-black">
                    <ModalHeader>Checkout</ModalHeader>
                    <ModalBody>
                        {cart.length === 0 ? (
                            <p>No items in cart.</p>
                        ) : (
                            <div>
                                {cart.map((item, index) => (
                                    <div key={index} className="flex justify-between mb-2">
                                        <p>{item.quantity} x {item.medicineName} from {item.pharmacyName}</p>
                                        <p>{item.pharmacyCost * item.quantity}₹</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleCheckoutClose}>
                            Close
                        </Button>
                        <Button>
                            Bill: {totalBill()}₹
                        </Button>
                        <Button className="bg-orange-main"> 
                            <Popover placement="left" backdrop="transparent" offset={-120}>
                                <PopoverTrigger onClick={placeOrder} >
                                    Place Order
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="px-1 py-2">
                                        <Image src="/success.gif"/>
                                        <div className="flex text-lg mx-auto px-auto justify-center text-green-600 font-bold">Your Order Was Placed</div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </div>)}
        </div>
    );
};

export default Page;
