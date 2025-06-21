<style>
.btn {
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  padding-top: 15px;
  position: relative;
}

.preview {
  width: 150px;
  height: 150px;
  border-radius: 15px;
}

.kycUploadHolding input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}

.img {
  display: inline-block;
  width: 50%;
}

.drop {
  border-radius: 2px;
  height: auto;
  max-height: 195px;
  min-height: 195px;
  max-width: 600px;
  width: 100%;
}
</style>
<template>
  <div>
    <div
      :style="this.$q.dark.isActive ? '' : ''"
      class="drop display-inline align-center"
      @dragover.prevent
      @drop="onDrop"
    >
      <label
        v-if="!image"
        class="btn display-inline"
        :class="this.$q.dark.isActive ? 'text-white' : ' text-black'"
      >
        <div :class="info.profileImage === '' ? 'row justify-center' : 'row'">
          <div
            :class="
              info.profileImage === '' ? 'col-8 self-center q-mt-xl' : 'col-8'
            "
          >
            <span
              class="text-caption text-bold text-accent"
              v-if="info.profileImage === ''"
            >
              Por favor selecciona o arrastra el archivo
            </span>
            <img
              v-else
              :src="config.api.url + info.profileImage"
              class="preview"
            />
          </div>
        </div>
        <q-input
          borderless
          class="kycUploadHolding"
          name="image"
          @change="onChange"
          @input="(val) => files(val)"
          type="file"
        />
      </label>
      <div class="q-mb-md" v-else v-bind:class="{ image: true }">
        <img :src="image" alt class="preview" />
      </div>
    </div>
    <q-btn
      style="margin-top: -20px"
      v-if="image"
      size="sm"
      round
      color="negative"
      @click="removeFile"
      icon="delete"
    ></q-btn>
  </div>
</template>
<script>
import config from "../../config";
export default {
  name: "upload",
  props: ["info"],
  data() {
    return {
      image: "",
      file: [],
      imageName: "",
      config: config,
    };
  },
  methods: {
    open(position) {
      this.position = position;
      this.dialog = true;
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      var FileSize = files[0].size / 1024 / 1024;
      if (!files[0].type.match("image/jpeg|image/png")) {
        alert("Solo se permiten imagenes con formato PNG o JPG");
        return;
      } else if (FileSize > 5) {
        alert("El archivo excede los 5mb");
      } else {
        this.createFile(files[0]);
        this.$emit("setImage", files);
      }
    },
    files(newValue) {
      var FileSize = newValue[0].size / 1024 / 1024;
      if (!newValue[0].type.match("image/jpeg|image/png")) {
        alert("Solo se permiten imagenes con formato PNG o JPG");
        return;
      } else if (FileSize > 5) {
        alert("El archivo excede los 5mb");
      } else {
        this.$emit("setImage", newValue);
        let name = newValue[0].name;
        if (newValue.length > 0) {
          if (name.length > 13) {
            this.imageName = name.slice(0, 13);
          } else {
            this.imageName = name;
          }
        } else {
          this.imageName = "";
        }
      }
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      var FileSize = file.size / 1024 / 1024;
      if (!file.type.match("image/jpeg|image/png")) {
        alert("Solo se permiten imagenes con formato PNG o JPG");
        return;
      } else if (FileSize > 5) {
        alert("El archivo excede los 5mb");
      } else {
        var img = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = function (e) {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeFile() {
      this.image = "";
      this.file = "";
      this.$emit("removeFile", {
        file: "",
      });
    },
  },
};
</script>
