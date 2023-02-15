import { Card } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import mall from "../../../assets/icons/mall.png";
import config from "../../../container/app/navigation.json";
import { Link, useHistory } from "react-router-dom";
const CardTile = (props) => {
  return (
    <>
      <div className={props.clas}>
        <div className="d-flex align-items-center ">
          <div className="col-md-4 p-2 display-none-mobile">
            <img src={props.image} className="" alt={props.title} height="40" />
          </div>
          <div className="col-md-8 p-2">
            <b>{props.title}</b>
            <h4>{props.total}</h4>
            <Link className="text-decoration-none text-dark fw-bolder" to={config.merchanturl.Subscription}>
              {props.linkimg && <img src={props.linkimg} className="border-0" alt={props.title} height="13" />}
              <b>
                {" "}
                <u>{props.link}</u>
              </b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTile;
