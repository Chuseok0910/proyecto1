<template>
  <div class="Home">

    <v-dialog v-model="dialogoEditar" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Tarea</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="nuevoTituloEditado"
              label="Título de la tarea"
              @keyup.enter="guardarEdicion()"
              autofocus
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelarEdicion()">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="guardarEdicion()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-text-field
      v-model="nuevoTituloTarea"
      @click:append="agregarTarea()"
      @keyup.enter="agregarTarea()"
      class="pa-3"
      outlined
      label="Nueva tarea"
      append-icon="mdi-plus"
      hide-details
      clearable
    >
    </v-text-field>

    <v-list flat>
      <div v-for="tarea in tareas" :key="tarea.id">
        <v-list-item
          @click="TareaHecho(tarea.id)"
          :class="{ 'blue': tarea.hecho }"
        >
          <template v-slot>
            <v-list-item-action>
              <v-checkbox
                :input-value="tarea.hecho" color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': tarea.hecho }"
              >{{ tarea.titulo }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              
              <v-btn
                icon
                @click.stop="iniciarEdicion(tarea)"
              >
                <v-icon color="primary lighten-1">mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                @click.stop="BorrarTarea(tarea.id)"
              >
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      nuevoTituloTarea: "",
      tareas: [
        {
          id: 1,
          titulo: "Levantarse",
          hecho: false,
        },
        {
          id: 2,
          titulo: "Desayunar",
          hecho: false,
        },
        {
          id: 3,
          titulo: "Ir a la escuela",
          hecho: false,
        }
      ],

      // --- CAMBIOS: Nuevas variables para el diálogo de edición ---
      dialogoEditar: false, // Controla si el diálogo se muestra o no
      tareaAEditar: null, // Almacena la tarea que estamos editando
      nuevoTituloEditado: "" // Almacena el texto del campo de edición
      // --- Fin de los cambios en data ---
    }
  },
  methods: {
    agregarTarea() {
      //console.log("Agregar tarea")
      let nTarea = {
        id: Date.now(),
        titulo: this.nuevoTituloTarea,
        hecho: false
      }
      this.tareas.push(nTarea)
      this.nuevoTituloTarea = ""
    },
    TareaHecho(id) {
      //console.log("ID:",id)
      let tarea = this.tareas.filter(tarea => tarea.id === id)[0]
      tarea.hecho = !tarea.hecho
    },
    BorrarTarea(id) {
      //alert(id)
      if (confirm("¿Deseas eliminar el registro?")) {
        this.tareas = this.tareas.filter(tarea => tarea.id != id)
      }
    },

    // --- CAMBIOS: Nuevos métodos para editar ---

    /**
     * Se llama al hacer clic en el icono de lápiz.
     * Prepara el diálogo de edición.
     */
    iniciarEdicion(tarea) {
      this.tareaAEditar = tarea; // Guarda la tarea que se va a editar
      this.nuevoTituloEditado = tarea.titulo; // Pone el título actual en el campo de texto
      this.dialogoEditar = true; // Muestra el diálogo
    },

    /**
     * Se llama al hacer clic en 'Cancelar' en el diálogo.
     * Cierra el diálogo y resetea las variables.
     */
    cancelarEdicion() {
      this.dialogoEditar = false;
      this.tareaAEditar = null;
      this.nuevoTituloEditado = "";
    },

    /**
     * Se llama al hacer clic en 'Guardar' en el diálogo.
     * Actualiza el título de la tarea y cierra el diálogo.
     */
    guardarEdicion() {
      // Nos aseguramos de que el nuevo título no esté vacío
      if (this.nuevoTituloEditado.trim() === "") {
        return; // Opcional: podrías mostrar una alerta aquí
      }
      
      // Actualiza el título de la tarea guardada
      this.tareaAEditar.titulo = this.nuevoTituloEditado;
      
      // Cierra el diálogo usando el método de cancelar
      this.cancelarEdicion();
    }
    // --- Fin de los nuevos métodos ---
  }
}
</script>
