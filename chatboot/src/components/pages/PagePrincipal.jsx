import PageChat from "./chat";
import Menu from "../menu/Menu";
import React, { useState, useEffect } from "react";
import PageCreadores from "./PageCreadores";
import UndefinePage from "./UndefinePage";

const PagePrincipal = () => {
    const endPoint = "https://chatboot-production-9c1c.up.railway.app"
    // const endPoint = "http://127.0.0.1:8000"


    const [seccion, setSeccion] = useState("HipertensoBot")
    const opcionSeleccionada = (opcion) => {
        document.title = opcion
        setSeccion(opcion)
    }

    return (
        <>
            <Menu endPoint={endPoint} opcionSeleccionada={opcionSeleccionada} />
            {seccion === 'HipertensoBot' && <PageChat endPoint={endPoint} />}
            {seccion === 'creadores' && <PageCreadores />}
            {seccion === 'op2' && <UndefinePage />}

        </>
    )
}

export default PagePrincipal