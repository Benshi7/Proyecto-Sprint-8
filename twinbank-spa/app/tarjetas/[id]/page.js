"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/app/utils/UserContext";
import cardsData from "../../../public/tarjetas.json";
import styles from "../Tarjetas.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CardDetail({ params }) {
  const router = useRouter();
  const [tarjeta, setTarjeta] = useState(null);
  const { id } = useParams();
  const { user } = useUser();
  const [movements, setMovements] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tarjetas/${id}`);
        const data = await response.json();
        setTarjeta(data)
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/movimientos/4`);
        const data = await response.json();
        setMovements(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transferencias');
        const data = await response.json();
        setMovements(data.filter((movement) => {
          return movement.cbuPago === user?.id
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); */

  const movementRows = movements.map((movement) => (
    <div className={styles["table-row"]} key={movement.id}>
      <div className={styles["detalle"]}>
        {movement.nombre}
      </div>
      <div className={styles["fecha"]}>{(movement.createdAt).split('T')[0]}</div>
      <div className={styles["precio"]}>
        {movement.monto}
      </div>
      <div className={styles["status"]}>
        <FontAwesomeIcon icon={faCheck} color="green" />
      </div>
    </div>
  ))

/* 
  useEffect(() => {
    const selectedCard = cardsData.find((card) => card.card.id === id);

    if (selectedCard) {
      setTarjeta(selectedCard.card);
    } else {
      router.push("/404");
    }
  }, [id, router]);

  if (!tarjeta) {
    return <div>Cargando...</div>;
  } */

/*   const {
    id: idTarjeta,
    number,
    type,
    valid,
    seccode,
    gradient,
    transactions,
  } = tarjeta; */

  const gradients = [
    null,
    "radial-gradient(circle at top left, #c3ec52 0%, #0ba29d 100%)",
    "radial-gradient(circle at top left, rgba(91, 36, 122, 1) 0%, rgba(27, 206, 223, 1) 100%)",
    "radial-gradient(circle at top left, #F36265 0%, #961276 100%)",
    // Agrega más gradientes según sea necesario
  ];

  return (
    <div className={styles.content}>
      <div className={styles["main-content"]}>
        <h2 className={styles.heading}>Detalles de la tarjeta</h2>
        <div className={styles["carddetails-container"]}>
          <div className={styles["card"]}>
            <div className={styles["card-inner"]}>
              <div
                className={styles["card-front"]}
                style={{ background: gradients[tarjeta?.marcaid] }}
              >
                <div className={styles["card-bg"]}></div>
                {tarjeta?.marcaid === "mastercard" ? (
                  <img
                    src="https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_circles_92px_2x.png"
                    alt="Mastercard Logo"
                    className={styles["logo"]}
                  />
                ) : (
                  <svg
                    width="72"
                    height="24"
                    viewBox="0 0 72 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles["logo"]}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
                      fill="white"
                    />
                  </svg>
                )}
                <div className={styles["card-contactless"]}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="56"
                  >
                    <path
                      fill="none"
                      stroke="#f9f9f9"
                      strokeWidth="6"
                      strokeLinecap="round"
                      d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
  0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                    />
                  </svg>
                </div>
                <div className={styles["card-chip"]}></div>
                <div className={styles["card-holder"]}>TwinBank Card</div>
                <div className={styles["card-number"]}>{tarjeta?.number}</div>
                <div className={styles["card-valid"]}>{tarjeta?.expiration_date}</div>
              </div>
              <div
                className={styles["card-back"]}
                style={{ background: gradients[tarjeta?.marcaid] }}
              >
                <div className={styles["card-signature"]}>{user?.username}</div>
                <div className={styles["card-seccode"]}>{tarjeta?.cvv}</div>
              </div>
            </div>
          </div>
          <div className={styles["container-transacciones"]}>
            <div className={styles["transacciones-content"]}>
              <h3>Últimas transacciones</h3>
              <div className={styles["table-container"]}>
                <div className={styles["table-header"]}>
                  <div>Detalle</div>
                  <div>Fecha</div>
                  <div>Precio</div>
                  <div>Status</div>
                </div>

                { movements && movements.length > 0 ? (
                    movementRows
                ) : (
                  <div><p>Cargando...</p></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
