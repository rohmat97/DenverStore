import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import detail from './recipeDetail.json'
function Recipe() {
    const [details, setdetails] = useState({})
    const [activeTab, setactiveTab] = useState('instructions')
    let params =useParams()
    const fetchDetail = async()=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json()
        console.log('detailData', detailData)
        if(detailData.code ===200){
            setdetails(detailData)
        }else{
            setdetails(detail)
        }

    }
    useEffect(() => {
        fetchDetail()
    }, [params.name])
    
  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title} />
        </div>
        <Info>
            <Button className={activeTab === 'instructions'?'active':''} onClick={()=> setactiveTab('instructions')}>Instruction</Button>
            <Button className={activeTab === 'ingredients'?'active':''} onClick={()=> setactiveTab('ingredients')}>Ingredients</Button>
            {
                activeTab  === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{ __html: details.summary }}/>
                    <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}/>
                </div>
                )
            }
            
            <ul>
                {
                     details.extendedIngredients && details.extendedIngredients.map((ingredients)=>{
                        return(
                            <li key={ingredients.id}>{ingredients.original}</li>
                        )}
                    )
                }
            </ul>
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`
const Info = styled.div`
    margin-left: 10rem;
    flex-direction: row;
`
export default Recipe
