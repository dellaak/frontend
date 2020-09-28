import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/rootActions";
import "./storeStyle.scss";
import { Redirect } from "react-router";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneIcon from "@material-ui/icons/Done";
import { loadStripe } from "@stripe/stripe-js";
import storeService from "../../services/storeService";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51HJHZTBMJvSS0pQiGyv75cSu77Nt4UzxK0q6dNS4F0u3dTXiipLFPZLsvqVCtKiiVfPICodIi7D5tgSjcqfgg97f00Q8MPJwiz"
);

export const Store = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [selected, setSelected] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userText, setUserText] = useState("");
  const [disableBuy, setDisableBuy] = useState(false);
  const [typeOf, setTypeOf] = useState(0);

  const checkBoxes = [
    {
      value: 25,
      label: "25 stickers for €70",
      discount: null,
      each: "3€/unit",
      priceId: "price_1HV41RBMJvSS0pQizWYl0Szr",
      checked: false,
    },
    {
      value: 50,
      label: "50 stickers for €125",
      discount: "-16%",
      each: "2.5€/unit",
      priceId: "price_1HV431BMJvSS0pQicYzLFmPy",
      checked: false,
    },
    {
      value: 100,
      label: "100 stickers for €180",
      discount: "-40%",
      each: "1.8€/unit",
      priceId: "price_1HV43TBMJvSS0pQimcrFBXzK",
      checked: false,
    },
    {
      value: 200,
      label: "200 stickers for €300",
      discount: "-50%",
      each: "1.5€/unit",
      priceId: "price_1HV43kBMJvSS0pQiJsWnoS9p",
      checked: false,
    },
    {
      value: 500,
      label: "500 stickers for €600",
      discount: "-60%",
      each: "1.2€/unit",
      priceId: "price_1HV449BMJvSS0pQiZdcHlfwQ",
      checked: false,
    },
    {
      value: "over",
      label: "Over 1000 stickers",
      discount: "-73%",
      each: "0.7€/unit",
      checked: false,
    },
  ];

  const checkBoxesSecond = [
    {
      value: 51,
      label: "51 stickers for €36",
      discount: null,
      each: "0.7€/unit",
      priceId: "price_1HVn7CBMJvSS0pQi52kZdYMk",
      checked: false,
    },
    {
      value: 100,
      label: "100 stickers for €70",
      discount: null,
      each: "0.7€/unit",
      priceId: "price_1HVn7fBMJvSS0pQiTPq4Qxml",
      checked: false,
    },
    {
      value: 200,
      label: "200 stickers for €140",
      discount: null,
      each: "0.7€/unit",
      priceId: "price_1HVn8cBMJvSS0pQiUD7B9ymL",
      checked: false,
    },
    {
      value: 300,
      label: "300 stickers for €165",
      discount: "-21%",
      each: "0.55€/unit",
      priceId: "price_1HVn9XBMJvSS0pQiTCOEtKI0",
      checked: false,
    },
    {
      value: 500,
      label: "500 stickers for €200",
      discount: "-42%",
      each: "0.4€/unit",
      priceId: "price_1HVnA2BMJvSS0pQi310YTz9a",
      checked: false,
    },
    {
      value: "over",
      label: "Over 1000 stickers",
      discount: "-60%",
      each: "0.28€/unit",
      checked: false,
    },
  ];

  const handleBuy = async (event) => {
    let creationDate = Math.floor(Date.now() / 1000);
    let data = {
      email: userEmail,
      text: userText,
      amount: selected.value,
      orderCreated: creationDate,
    };

    await storeService.create(data, async (err, res) => {
      setDisableBuy(true);
      if (res.status === 200) {
        const stripe = await stripePromise;
        // When the customer clicks on the button, redirect them to Checkout.
        const { error } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price: selected.priceId, // Replace with the ID of your price
              quantity: 1,
            },
          ],
          customerEmail: userEmail,
          mode: "payment",
          successUrl: "https://sharemysocials.com/success",
          cancelUrl: "https://sharemysocials.com/cancel",
          shippingAddressCollection: {
            allowedCountries: [
              "AC",
              "AD",
              "AE",
              "AF",
              "AG",
              "AI",
              "AL",
              "AM",
              "AO",
              "AQ",
              "AR",
              "AT",
              "AU",
              "AW",
              "AX",
              "AZ",
              "BA",
              "BB",
              "BD",
              "BE",
              "BF",
              "BG",
              "BH",
              "BI",
              "BJ",
              "BL",
              "BM",
              "BN",
              "BO",
              "BQ",
              "BR",
              "BS",
              "BT",
              "BV",
              "BW",
              "BY",
              "BZ",
              "CA",
              "CD",
              "CF",
              "CG",
              "CH",
              "CI",
              "CK",
              "CL",
              "CM",
              "CN",
              "CO",
              "CR",
              "CV",
              "CW",
              "CY",
              "CZ",
              "DE",
              "DJ",
              "DK",
              "DM",
              "DO",
              "DZ",
              "EC",
              "EE",
              "EG",
              "EH",
              "ER",
              "ES",
              "ET",
              "FI",
              "FJ",
              "FK",
              "FO",
              "FR",
              "GA",
              "GB",
              "GD",
              "GE",
              "GF",
              "GG",
              "GH",
              "GI",
              "GL",
              "GM",
              "GN",
              "GP",
              "GQ",
              "GR",
              "GS",
              "GT",
              "GU",
              "GW",
              "GY",
              "HK",
              "HN",
              "HR",
              "HT",
              "HU",
              "ID",
              "IE",
              "IL",
              "IM",
              "IN",
              "IO",
              "IQ",
              "IS",
              "IT",
              "JE",
              "JM",
              "JO",
              "JP",
              "KE",
              "KG",
              "KH",
              "KI",
              "KM",
              "KN",
              "KR",
              "KW",
              "KY",
              "KZ",
              "LA",
              "LB",
              "LC",
              "LI",
              "LK",
              "LR",
              "LS",
              "LT",
              "LU",
              "LV",
              "LY",
              "MA",
              "MC",
              "MD",
              "ME",
              "MF",
              "MG",
              "MK",
              "ML",
              "MM",
              "MN",
              "MO",
              "MQ",
              "MR",
              "MS",
              "MT",
              "MU",
              "MV",
              "MW",
              "MX",
              "MY",
              "MZ",
              "NA",
              "NC",
              "NE",
              "NG",
              "NI",
              "NL",
              "NO",
              "NP",
              "NR",
              "NU",
              "NZ",
              "OM",
              "PA",
              "PE",
              "PF",
              "PG",
              "PH",
              "PK",
              "PL",
              "PM",
              "PN",
              "PR",
              "PS",
              "PT",
              "PY",
              "QA",
              "RE",
              "RO",
              "RS",
              "RU",
              "RW",
              "SA",
              "SB",
              "SC",
              "SE",
              "SG",
              "SH",
              "SI",
              "SJ",
              "SK",
              "SL",
              "SM",
              "SN",
              "SO",
              "SR",
              "SS",
              "ST",
              "SV",
              "SX",
              "SZ",
              "TA",
              "TC",
              "TD",
              "TF",
              "TG",
              "TH",
              "TJ",
              "TK",
              "TL",
              "TM",
              "TN",
              "TO",
              "TR",
              "TT",
              "TV",
              "TW",
              "TZ",
              "UA",
              "UG",
              "US",
              "UY",
              "UZ",
              "VA",
              "VC",
              "VE",
              "VG",
              "VN",
              "VU",
              "WF",
              "WS",
              "XK",
              "YE",
              "YT",
              "ZA",
              "ZM",
              "ZW",
            ],
          },
        });
      }
    });
    setDisableBuy(false);
  };

  useEffect(() => {
    dispatch(actions.getPublicUser());
  }, []);

  useEffect(() => {
    if (user && user.userData) {
      setUserEmail(user.userData.email);
    }
  }, [user && user.userData]);

  const handleChange = async (item) => {
    setSelected(item);
  };

useEffect(() => {
console.log(typeOf)
}, [typeOf])

  return (
    <>
     {typeOf === 0 &&  <Grid container item direction="column"  >
        <Grid item md={12}>
          <p className="choose-txt">Choose sticker type</p>
        </Grid>
        <Grid container justify="center">
        <Grid item md={6}  className="sticker-start">
          <div onClick={()=>{setTypeOf(1)}} style={{cursor:"pointer"}}>
          <img src="/images/stickerex.png" className="sticker-img-selection" alt="stickers-ex" />
          <p><b>10x10cm</b> Indoor/Outdoor stickers </p>
          <p>Perfect on Tables, Doors</p>
          <p>Made with white quality vinyl</p>
          </div>
        </Grid>
        <Grid item md={6} className="sticker-start">
          <div onClick={()=>{setTypeOf(2)}} style={{cursor:"pointer"}}>
          <img src="/images/stickerex.png" className="sticker-img-selection"  alt="stickers-ex" />
          <p><b>5x5cm</b> Indoor stickers </p>
          <p>Perfect on Cups, Carboards, Packages</p>
          <p>Made with laminated polypropylene</p>
          </div>
        </Grid>
        </Grid>
      </Grid>}

      {typeOf === 1 && (
        <Grid container item md={10} xs={10} alignItems="flex-start">
          <Grid item md={6}>
            <img src="/images/stickerex.png" className="sticker-img" />
          </Grid>
          <Grid item md={4}>
            <h3>
              Buy high quality stickers for you or your company to put on
              tables, doors, carboards, cars or wherever you want!
            </h3>
            <p>The stickers are</p>
            <ul className="ul-list">
              <li>
                <DoneIcon /> Unbeatable print quality
              </li>
              <li>
                <DoneIcon /> Laminated high-gloss surface
              </li>
              <li>
                <DoneIcon /> Colors that can withstand sunlight and outdoor use
              </li>
            </ul>
            <small>The order can take up to 20 business days. </small>
            <div className="input-wrap-text">
              <p className="info-text-store">
                Enter text to replace the "YOUR TEXT HERE" example in the image.
              </p>
              <span className="req-field-store">This field is required!</span>{" "}
              <small className="store-count">{userText.length}/50</small>
              <TextField
                onChange={(e) => {
                  if (userText.length < 51) {
                    setUserText(e.target.value);
                  }
                }}
                required
                label="Enter your text here"
                multiline
                rows={2}
                id="filled-start-adornment"
                helperText="Between 4-45 characters"
                variant="outlined"
              />
            </div>
            <FormGroup>
              {checkBoxes.map((i, index) => {
                return (
                  <div className="price-label" key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={i.value === selected.value && true}
                          onChange={() => {
                            handleChange(i);
                          }}
                          name="checkedB"
                          color="primary"
                          value={i.value}
                        />
                      }
                      label={i.label}
                    />

                    {!i.discount && <small>{i.each}</small>}

                    {i.discount && (
                      <small>
                        {i.each}
                        <div className="price-tag sm">
                          <div className="price">{i.discount}</div>
                        </div>
                      </small>
                    )}
                  </div>
                );
              })}
            </FormGroup>

            <div className="btn-checkout-wrap">
              {selected.value !== "over" ? (
                <>
                  <Button
                    className="buy-btn"
                    disabled={!selected || disableBuy || userText.length < 4}
                    onClick={handleBuy}
                  >
                    <ShoppingBasketIcon />
                    Buy {selected.value} stickers{" "}
                  </Button>
                  <small>
                    We are using Stripe as payment method. All your information
                    is encrypted and secure
                  </small>
                </>
              ) : (
                <div className="order-mail-wrap">
                  To order over 1000 stickers please contact{" "}
                  <a href="mailto:info@sharemysocials.com">
                    Info@sharemysocials.com
                  </a>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      )}



{typeOf === 2 && (
        <Grid container item md={10} xs={10} alignItems="flex-start">
          <Grid item md={6}>
            <img src="/images/stickerex.png" className="sticker-img" />
          </Grid>
          <Grid item md={4}>
            <h3>
              Buy Scratch-resistant stickers for you or your company to put on
              cups, packages or wherever you want!
            </h3>
            <p>The stickers are</p>

            <ul className="ul-list">
              <li>
                <DoneIcon /> Printed in CMYK
              </li>
              <li>
                <DoneIcon /> Scratch-resistant laminated polypropylene
              </li>
              <li>
                <DoneIcon /> For indoor use
              </li>
              <li>
                <DoneIcon /> Dishwasher and microwave safe
              </li>
              <li>
                <DoneIcon /> Delivered on sheets
              </li>
            </ul>
            <small>The order can take up to 20 business days. </small>
            <div className="input-wrap-text">
              <p className="info-text-store">
                Enter text to replace the "YOUR TEXT HERE" example in the image.
              </p>
              <span className="req-field-store">This field is required!</span>{" "}
              <small className="store-count">{userText.length}/50</small>
              <TextField
                onChange={(e) => {
                  if (userText.length < 51) {
                    setUserText(e.target.value);
                  }
                }}
                required
                label="Enter your text here"
                multiline
                rows={2}
                id="filled-start-adornment"
                helperText="Between 4-45 characters"
                variant="outlined"
              />
            </div>
            <FormGroup>
              {checkBoxesSecond.map((i, index) => {
                return (
                  <div className="price-label" key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={i.value === selected.value && true}
                          onChange={() => {
                            handleChange(i);
                          }}
                          name="checkedB"
                          color="primary"
                          value={i.value}
                        />
                      }
                      label={i.label}
                    />

                    {!i.discount && <small>{i.each}</small>}

                    {i.discount && (
                      <small>
                        {i.each}
                        <div className="price-tag sm">
                          <div className="price">{i.discount}</div>
                        </div>
                      </small>
                    )}
                  </div>
                );
              })}
            </FormGroup>

            <div className="btn-checkout-wrap">
              {selected.value !== "over" ? (
                <>
                  <Button
                    className="buy-btn"
                    disabled={!selected || disableBuy || userText.length < 4}
                    onClick={handleBuy}
                  >
                    <ShoppingBasketIcon />
                    Buy {selected.value} stickers{" "}
                  </Button>
                  <small>
                    We are using Stripe as payment method. All your information
                    is encrypted and secure
                  </small>
                </>
              ) : (
                <div className="order-mail-wrap">
                  To order over 1000 stickers please contact{" "}
                  <a href="mailto:info@sharemysocials.com">
                    Info@sharemysocials.com
                  </a>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};
