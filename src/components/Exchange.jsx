import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Exchange() {
  const [currency, setCurrency] = useState("inr");
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const currencysymbol =
    currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";
  const changepage = (page) => {
    setPage(page);
    setLoading(true);
  };
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
        );
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchExchanges();
  }, [currency, page]);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                id={i.id}
                price={i.current_price}
                key={i.id}
                symbol={i.symbol}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
          <HStack>
            <Button onClick={() => changepage(2)}>2</Button>
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCard = ({
  id,
  name,
  img,
  rank,
  url,
  price,
  symbol,
  current_price = "₹",
}) => (
  <Link to={`/coin/${id}`}>
    <div>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>

        <Text noOfLines={1}>{name}</Text>

        <Text noOfLines={1}>
          {price}&nbsp;
          {current_price}
        </Text>
      </VStack>
    </div>
  </Link>
);

export default Exchange;
