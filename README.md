# nexuAPI

Para el desarrollo se utilizaron las tecnologias:
- supabase -> base de datos
- NodeJs
- Express

# despliegue

Una vez clonado el proyecto

- instalar dependencias
    npm install

debe crear un archivo env con los datos de conexion requeridos en el.env.example
estos datos se pueden obtener una vez creada la base de datos en supabase - vercel

para iniciar el proyecto
  node index

Para la informacion de la base de datos se utilizaron los siguientes datos:

[datos tabla brands](https://github.com/user-attachments/files/17781947/brands.csv)
[datos tabla models](https://github.com/user-attachments/files/17781946/models.csv)

#ENDPOINTS

- GET /brands

Se espera el listado de todos los brands existentes con el promedio de costo por cada marca
![Captura de pantalla 2024-11-15 162258](https://github.com/user-attachments/assets/082b33ae-c42a-4976-b65d-1870b97b4215)

- GET /brands/:id/models

Se espera el listado de todos los modelos con sus datos filtrados por marca
    - id -> id brand
![Captura de pantalla 2024-11-15 162436](https://github.com/user-attachments/assets/663641e4-6bd6-4cc3-bd84-6ca2fd97c562)

- POST /brands

Se espera la creacion de una nueva marca, siempre y cuando no exista el mismo nombre previamente creado
    Body: 
        {
            "name": "test1"
        }

![Captura de pantalla 2024-11-15 162617](https://github.com/user-attachments/assets/7d1df35c-5890-4338-8023-93f642ca52f9)

- POST /brands/:id/models

Se espera la creacion de un nuevo modelo asignad a una marca
    - id -> id brand
    Body:
        {
            "name": "test1"
        }

![Captura de pantalla 2024-11-15 162811](https://github.com/user-attachments/assets/81c498e7-550b-4f8e-bb62-bc0854ce7499)

- PUT /models/:id

Se espera la actualización de average_price de un modelo en especifico, siempre y cuando el monto sea mayor a 100000
    - id -> id model
    Body: 
        {
            "average_price": 100001
        }
        
![Captura de pantalla 2024-11-15 163000](https://github.com/user-attachments/assets/73e74133-ccbe-4292-ab15-517067f5f062)

-GET models?greater=150000&lower=200000

Se espera el listado de los modelos, se pueden agregar los filtros greater y lower, estos son opcionales.


![Captura de pantalla 2024-11-15 163121](https://github.com/user-attachments/assets/e551df77-55df-4c49-8251-6cf457c877c2)


# Notas

-Test, se pretendia realizar test unitarios para probar cada metodo de la capa de actions, esto mediante jest, no se realiza por falta de tiempo
- Despliegue, se pretendia realizar el despliegue en vercel, este no se ejecuto de forma exitosa, sigo investigando el por que. https://nexu-api.vercel.app/
