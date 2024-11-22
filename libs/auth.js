export async function getLogin(datos) {
  const URL_LOGIN = "http://www.lvlerp.com.ar/api/login";

  const data = { email: datos.email, password: datos.password };
  //const data = { email: "rrufino71@gmail.com", password: "11111" };
  let response = {};
  //console.log("data", data);

  try {
    const result = await fetch(URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Define que estamos enviando JSON
      },
      body: JSON.stringify(data), // Lo que enviamos en el cuerpo de la solicitud
    });

    const respuesta = await result.json(); // Convierte la respuesta a JSON

    //console.log("respuesta", respuesta);

    // Manejo de la respuesta
    if (respuesta.status) {
      //response = await result.json(); // Convierte la respuesta a JSON
      //  console.log("logueado");
      response = {
        status: respuesta.status,
        message: respuesta.message,
        data: respuesta.data,
        token: respuesta.token,
      };
    } else {
      // Captura código y texto de estado para los errores
      let errorText = "";
      if (!response.status && Array.isArray(respuesta.errors)) {
        errorText = respuesta.errors.join(" - "); // Une los errores con un salto de línea
      } else {
        errorText = respuesta.errors;
      }

      response = {
        status: respuesta.status,
        message: errorText,
      };
    }
  } catch (error) {
    response = {
      status: "false",
      message: respuesta.errors || "Error Desconocido",
    };
  }
  //console.log("response", response);
  return response;
}

export async function registerUser(datos) {
  const URL_REGISTER = "http://www.lvlerp.com.ar/api/registro";

  const data = {
    name: datos.name,
    email: datos.email,
    password: datos.password,
  };
  //const data = { email: "rrufino71@gmail.com", password: "11111" };
  let response = {};
  //console.log("data", data);

  try {
    const result = await fetch(URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Define que estamos enviando JSON
      },
      body: JSON.stringify(data), // Lo que enviamos en el cuerpo de la solicitud
    });

    const respuesta = await result.json(); // Convierte la respuesta a JSON

    //console.log("respuesta", respuesta);

    // Manejo de la respuesta
    if (respuesta.status) {
      //response = await result.json(); // Convierte la respuesta a JSON
      //  console.log("logueado");
      response = {
        status: respuesta.status,
        message: respuesta.message,
        data: respuesta.data,
        token: respuesta.token,
      };
    } else {
      // Captura código y texto de estado para los errores
      let errorText = "";
      if (!response.status && Array.isArray(respuesta.errors)) {
        errorText = respuesta.errors.join(" - "); // Une los errores con un salto de línea
      } else {
        errorText = respuesta.errors;
      }

      response = {
        status: respuesta.status,
        message: errorText,
      };
    }
  } catch (error) {
    response = {
      status: "false",
      message: respuesta.errors || "Error Desconocido",
    };
  }
  //console.log("response", response);
  return response;
}

export async function updateUser(datos) {
  const URL_UPDATE_USER = "http://www.lvlerp.com.ar/api/user/update";

  const data = {
    id: datos.id,
    name: datos.name,
    email: datos.email,
    telefono: datos.telefono,
    notifica: datos.notifica,
    argentino: datos.argentino,
    cumple: datos.cumple,
    token: datos.token
  };

  //console.log("data",data)
  //const data = { id: 1, name:"rr",email: "rrufino71@gmail.com", telefono:"111111", cumple: '1971-08-24',token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3d3Lmx2bGVycC5jb20uYXIvYXBpL2xvZ2luIiwiaWF0IjoxNzMyMzA1MzM5LCJleHAiOjE3MzIzMDg5MzksIm5iZiI6MTczMjMwNTMzOSwianRpIjoiMGpwVVlXYkdLVWtCVDQxSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.kedUYScKPSZSQfCtBLdqs8ekvMS-0j-IpfMuK8gzGj8" };
  let response = {};
  //console.log("data", data);

  try {
    const result = await fetch(URL_UPDATE_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Define que estamos enviando JSON
      },
      body: JSON.stringify(data), // Lo que enviamos en el cuerpo de la solicitud
    });

    const respuesta = await result.json(); // Convierte la respuesta a JSON

    //console.log("respuesta", respuesta);

    // Manejo de la respuesta
    if (respuesta.status) {
      //response = await result.json(); // Convierte la respuesta a JSON
      ///console.log("logueado");
      response = {
        status: respuesta.status,
        message: respuesta.message,
        data: respuesta.data,
        token: respuesta.token,
      };
      console.log('response',response)
    } else {
      // Captura código y texto de estado para los errores
      let errorText = "";
      if (!response.status && Array.isArray(respuesta.errors)) {
        errorText = respuesta.errors.join(" - "); // Une los errores con un salto de línea
      } else {
        errorText = respuesta.errors;
      }

      response = {
        status: respuesta.status,
        message: errorText,
      };
    }
  } catch (error) {
    //console.log(error.message)
    response = {
      status: "false",
      message: respuesta.errors || "Error Desconocido",
    };
  }

  return response;
}
