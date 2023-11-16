import { transporter } from "../Email.connection.js";

export const mensaje_Confirm_Login = async (email, nombre, codigo) => {

    const info = await transporter.sendMail({
        from: '"Verificacion de email SenaLearn" <senalearns@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `Hello ${nombre} ✔`, // Subject line
        text: "correo enviado desde node js", // plain text body
        html: `<div class="container-sm ">
        <p>
          Estas intentando ingresar a tu cuenta desde una ubicacion distinta?
        </p>
    
        <ul>
          <li>Si eres tu haz click en el siguiente codigo: ${codigo}</li>
        </ul>
  
         
        <p>Asegúrate de mantener segura tu contraseña y no compartirla con nadie. Si olvidas tu contraseña en el futuro, puedes utilizar la opción "Olvidé mi contraseña" en la página de inicio de sesión para restablecerla.</p>
    
        <p>¡Gracias por unirte a SenaLearn! Esperamos que disfrutes de tu experiencia en nuestra plataforma.
    
          Atentamente,
          
          El Equipo de SenaLearn</p>
      </div>`, // html body
    });
}