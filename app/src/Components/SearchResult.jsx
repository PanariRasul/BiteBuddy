// app/src/Components/SearchResult.jsx
import { styled } from "styled-components";
import Button from "./Button";
import { BASE_URL } from "../pages/CustomerMenu";
/**
{
    
"name": "CAKE",
"price": 18,
"text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
"image": "/images/cake.png",
"type": "breakfast"
}
*/
const SearchResult = ({ data }) => {
    return (<FoodCardContainer>

        {
            data?.map((food) => (
                <FoodCard key={food.name}>
                    <div className="food-img">
                        <img src={BASE_URL + food.image} alt="image" />
                    </div>
                    <div className="food-content">
                        <h4>{food.name}</h4>
                        <p> {food.text} </p>
                        <div className="btn">
                            <Button name={"$ " + food.price.toFixed(2)} />
                        </div>
                    </div>
                </FoodCard>
            ))
        }

    </FoodCardContainer>)
};

export default SearchResult;

const FoodCardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px 0;
    gap: 20px;
    flex-wrap: wrap;
    max-width:1200px;
`;
const FoodCard = styled.div`
    width: 350px;
    height: 170px;
    padding: 10px;
    display: flex;
    border: 1px solid #ffffff;
    align-items: center;
    justify-content: space-between;
    border-radius:20px;
    gap: 20px;
    border-image-source: radial-gradient(
        80.69% 208.78% at 108.28% 112.58%,
        #eabfff 0%,
        rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
        80.38% 222.5% at -13.75% -12.36%,
        #98f9ff 0%,
        rgba(255, 255, 255, 0) 100%
    );

    background: url(.png),
    radial-gradient(
        90.16% 143.01% at 15.32% 21.04%,
        rgba(165, 239, 255, 0.2) 0%,
        rgba(110, 191, 244, 0.0447917) 77.08%,
        rgba(70, 144, 213, 0) 100%
    );
    background-blend-mode: overlay, normal;
    backdrop-filter: blur(13.1842px);
    

    .food-img{
        width: 135px;
        height: 135px;

        img{
            width: 153px;
            height: 153px;
        }
    }

    .food-content{
        display: flex;
        flex-direction: column;
        margin-left: 2px;

        h4{
            font-size: 16px;
            font-weight: 700;
            color: white;
        }

        p{
            color: white;
            font-size: 14px;
            line-height: 20px;
        }

        .btn{
            width: 100%;
            margin-top: 15px;


            Button{
            float: right;
            margin-left: auto;
            margin-right: 15px;
            font-size: 12px;
        }
        }
    }
`;