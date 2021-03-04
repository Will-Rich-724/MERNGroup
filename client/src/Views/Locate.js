import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from "axios";

const Locate = (props) => {
  return (
    <div>
      <label for="start">
        Please enter your zip code for blood donation sites near you:
      </label>

      <input
        type="text"
        id="zip"
        name="zipCode"
        inputmode="numeric"
        min="2018-01-01"
        max="2018-12-31"
      ></input>
      <h1>Where Map will be called</h1>
      <ol>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
          reiciendis, debitis libero neque expedita totam eius magnam laboriosam
          facilis blanditiis ab alias ipsam illo dolores excepturi. Alias fugit
          saepe maxime. Recusandae quo adipisci veritatis officiis enim
          accusantium quis! Aspernatur eos tempora mollitia assumenda eveniet
          harum ex nemo veniam debitis? Aperiam recusandae doloremque aspernatur
          quidem eveniet eaque impedit, rerum suscipit adipisci.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
          reiciendis, debitis libero neque expedita totam eius magnam laboriosam
          facilis blanditiis ab alias ipsam illo dolores excepturi. Alias fugit
          saepe maxime. Recusandae quo adipisci veritatis officiis enim
          accusantium quis! Aspernatur eos tempora mollitia assumenda eveniet
          harum ex nemo veniam debitis? Aperiam recusandae doloremque aspernatur
          quidem eveniet eaque impedit, rerum suscipit adipisci.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
          reiciendis, debitis libero neque expedita totam eius magnam laboriosam
          facilis blanditiis ab alias ipsam illo dolores excepturi. Alias fugit
          saepe maxime. Recusandae quo adipisci veritatis officiis enim
          accusantium quis! Aspernatur eos tempora mollitia assumenda eveniet
          harum ex nemo veniam debitis? Aperiam recusandae doloremque aspernatur
          quidem eveniet eaque impedit, rerum suscipit adipisci.
        </li>
      </ol>
    </div>
  );
};

export default Locate;
