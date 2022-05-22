
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Cuisine() {
    const [cuisine, setcuisine] = useState([])
    let params = useParams()
    useEffect(() => {
        getCuisine(params.type)
        // console.log('params', params)
    }, [params.type])
    
    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
        const recipes = await data.json();
        console.log('recipes', recipes.results)
        setcuisine(recipes.results)
    }
  return (
    <Grid
        animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration: 0.5}}
    >
        {
            cuisine.map(data =>{
                return(
                    <Card key={data.id}>
                        <Link to={'/recipe/'+data.id}>
                            <img src={data.image} alt="" />
                            <h4>{data.title}</h4>
                        </Link>
                    </Card>
                )
            })
        }
    </Grid>
  )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem,1fr));
    grid-gap: 3rem;
`
const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`
export default Cuisine