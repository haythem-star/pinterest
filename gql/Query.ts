import { gql } from "@apollo/client";


export const GET_IMAGES = gql`
query getImages{
    hello{
        id,
    description,
    urls{
      raw,
      full
    }
    user{name,profile_image{large}}
    }
    
  }`


export const SEARCH_IMAGES = gql`
  query searchImages($search: String){
      search(query: $search){
          id,
      description,
      urls{
        raw,
        full
      }
      user{name,profile_image{large}}
      }
      
    }`