

const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Category {
    id:number,
    name:string,
    slug:string,
    image:string,
    creationAt:string,
    updateAt:string,
}

export interface Product {
    id:number,
    title:string,
    slug:string,
    price:string,
    description:string,
    category:Category,
    images: string[],
}

export interface CarItem {
    id: number,
    name:string,
    price:number,
    quantity: number,
}

export const ApiQueryFn ={
    //product endpoints
    getProducts: async (): Promise<Product[]> =>{
     try{
        const response = await fetch(`${API_BASE_URL}/product?offset=0&limit=20`);
        
        if(!response.ok){
            throw new Error(`Error fetch product: ${response.status}`);
        }
        console.log('response',response)
        return await response.json()
     } catch (error){
        console.error('failed to fetch products',error);
        throw error;
     }

    }
}

export default ApiQueryFn;