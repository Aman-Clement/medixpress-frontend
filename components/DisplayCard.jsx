
"use client";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {MedicineImages} from './MedicineData';
import { useEffect, useState } from "react";

export const DisplayCard = () =>{
 
  const [MedicineList, setMedicinelist] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);
  

  const fetchMedicines = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/medicines`)

      if (!response.ok) {
          throw new Error('Failed to Fetch Medicines');
      }

      const data = await response.json(); // Assuming this returns your JSON token
      // Store the entire JSON object as a string
      console.log(data) 

      let index = -1;
      const ListWithImages = data.map(item => {
        index = index+1;
        return {
            ...item,
            img:  MedicineImages[index].img 
        };
    });

    console.log("list", ListWithImages);
      setMedicinelist(ListWithImages);
      setIsloading(false);


      // You can redirect or perform other actions after successful login
  } catch (error) {
    console.error('Error during fetching medicines:', error);
    setIsloading(false); 
  } 
  }

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
       {isLoading ? (<>Loading</>) :(MedicineList.map((item, index) => (
        <Card shadow="sm" className="mx-auto w-80" key={index} isPressable onPress={() => console.log("item pressed")}>
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
  );
}
