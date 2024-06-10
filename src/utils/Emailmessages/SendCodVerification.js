import { transporter } from "../Email.connection.js";
export const SendCode = async (email, nombre, codigo, flag) => {

  if (flag == 3) {

    const info = await transporter.sendMail({
      from: '"Restablecimiento de contraseña SENALEARN" <senalearns@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `Hola ${nombre} ✔`, // Subject line
      text: "correo enviado desde node js", // plain text body
      html: `<div class="container-sm ">
      
      <p>
        <strong> Por favor verifica tu correo electrónico:</strong>
        Para completar el proceso de restablecimiento de contraseña, necesitamos verificar tu identidad. Por favor, sigue estos pasos:
      </p>
  
      <ul>
        <li>Utiliza el siguiente codigo de verificación: ${codigo} </li>
        <li>Haz clic en "Verificar" o "Confirmar" para completar el proceso de verificación</li>
      </ul>
  
      <p>Una vez que hayas verificado tu dirección de correo electrónico, podras acceder con tu nueva contraseña</p>
   
      
       
      <p>Asegúrate de mantener segura tu contraseña y no compartirla con nadie. Si olvidas tu contraseña en el futuro, puedes utilizar la opción "Olvidé mi contraseña" en la página de inicio de sesión para restablecerla.</p>
  
      <p>¡Gracias por unirte a SENALEARN! Esperamos que disfrutes de tu experiencia en nuestra plataforma.
  
        Atentamente,
        
        El Equipo de SENALEARN</p>
    </div>`, // html body
    });
  } else {

    const info = await transporter.sendMail({
      from: '"Verificacion de email SENALEARN" <senalearns@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `Hola ${nombre} ✔`, // Subject line
      text: "correo enviado desde node js", // plain text body
      html: `<div class="container-sm ">
          
          <p>
            <strong> Por favor verifica tu correo electrónico:</strong>
            Para completar el proceso de registro, necesitamos que verifiques tu dirección de correo electrónico. Por favor, sigue estos pasos:
          </p>
      
          <ul>
            <li>Utiliza el siguiente codigo de verificación: ${codigo} </li>
            <li>Haz clic en "Verificar" o "Confirmar" para completar el proceso de verificación</li>
          </ul>
      
          <p>Una vez que hayas verificado tu dirección de correo electrónico, tendrás acceso completo a todas las funciones y recursos disponibles</p>
       
          
           
          <p>Asegúrate de mantener segura tu contraseña y no compartirla con nadie. Si olvidas tu contraseña en el futuro, puedes utilizar la opción "Olvidé mi contraseña" en la página de inicio de sesión para restablecerla.</p>
      
          <p>¡Gracias por unirte a SENALEARN! Esperamos que disfrutes de tu experiencia en nuestra plataforma.
      
            Atentamente,
            
            El Equipo de SENALEARN</p>
        </div>`, // html body
    });

  }


}