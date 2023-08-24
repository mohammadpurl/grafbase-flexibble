import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production'
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAGHBASE_API_URL || '' :'http://127.0.0.1:4000/graghql'
const apiKey =  isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY  || '' :'LETMEIN'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL  : 'http://localhost:3000'
const client = new GraphQLClient(apiUrl)
const makeGraghQLRequest = async (query:string, variables:{}) =>{
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error
    }
}

export const  getUser = (email:string) => {
    client.setHeader('X-api-key',apiKey)
    return makeGraghQLRequest(getUserQuery, {email})
}

export const createUser =(name:string , email:string, avatarUrl:string) => {
    client.setHeader('X-api-key',apiKey)

    const variables ={
        input:{
            name, email, avatarUrl
        }
    }
    return makeGraghQLRequest(createUserMutation, variables)

}