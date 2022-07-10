export default class InsertImage {
  id: string = "";
  data : any = null
  //@ts-ignore
  constructor({ data }) {
    this.data = data
  }

  static get toolbox() {
    return {
      title: 'Samba',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render() {
    let id = Date.now().toString();

    let container = document.createElement("div");

    this.id = id;

    if(this.data.content) {
      let image = document.createElement("img");
      image.src = this.data.content
      container.appendChild(image)
      return container
    }

    container.innerHTML = `
        <div class="mt-1 m-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm text-gray-600">
                <label for="${id}" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="${id}" accept=".jpg, .png, .pdf" name="file-upload" type="file" class="sr-only">
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, PDF up to 1MB</p>
            </div>
          </div>
        `;

    container.querySelector("input")?.addEventListener("change",(ev) => {

        let image = document.createElement("img");
        image.classList.add("m-2")
        //@ts-ignore
        let file = ev.target.files[0];
        if (file) {
          let fr = new FileReader();
          fr.onload = (ev) => {
            image.src = fr.result as string;
          };
          fr.readAsDataURL(file);

          container.innerHTML = "";
          container.appendChild(image);
        }
      },
      false
    );

    return container;
  }

  save(blockContent: any) {
    //@ts-ignore
    let file = document.getElementById(this.id)?.files?.[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      while (!reader.result) {
        // keep spinning
      }

      return {
        content: reader.result,
      };
    }
  }

  validate(saveData: any) {
    if (!saveData.content) {
      return false;
    }
    return true;
  }
}
