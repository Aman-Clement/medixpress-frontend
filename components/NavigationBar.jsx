"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, User} from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/logo.png"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const NavigationBar = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsloading] = useState(true)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter()
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        console.log(token)
        setIsAuthenticated(token); 

        let customerId;

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                let customer = decodedToken.name;
                console.log("token",decodedToken)
                console.log(customerName) // Adjust this based on your JWT structure
                setCustomerName(customer)
                let email = decodedToken.email;
                setCustomerEmail(email)
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        setIsloading(false)

    }, []);


    const handleSignout = (e) => {
        localStorage.removeItem('authToken');
        window.location.reload();
        router.push('/'); 
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


  return (
    <Navbar className="bg-orange-main">
      <NavbarBrand>
        <Link href="/" color="foreground">
        <Image src={Logo} className="w-auto h-11"/>
        <p className="pl-1 font-bold text-inherit">MediXpress</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/medicine">
            Medicine
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" aria-current="page">
            Pharmacy
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!isAuthenticated && <NavbarItem className="hidden lg:flex">
          <Link href="/login" color="foreground">Login</Link>
        </NavbarItem>}
        {!isAuthenticated && <NavbarItem>
          <Button as={Link} className="opacity-80 font-extrabold text-white" href="/signup" variant="bordered">
            Sign Up
          </Button>
        </NavbarItem>}
        {isAuthenticated && <NavbarItem>
            <User as={Link} className="opacity-80 font-extrabold text-white" variant="bordered" onPress={onOpen} name={customerName}
      description={<div className="text-gray-800">{customerEmail}</div>}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}/> 
        </NavbarItem>}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <User   
      name={customerName}
      description={customerEmail}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
                <p> 
                 This is a dummy profile view.
                </p>
                <p>
                 Can add the previous orders and other fields specific to the user
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSignout}>
                  Sign Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </NavbarContent>
    </Navbar>
  );
}

export default NavigationBar;