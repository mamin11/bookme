<template>
    <tbody class="text-sm">
    <!-- Row -->
    <tr>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div class="flex items-center">
            <label class="inline-flex">
            <!-- <span class="sr-only">Select</span> -->
            
            <input :id="service.id" class="form-checkbox" type="checkbox" :value="value" />
            <!-- <input :id="service.id" class="form-checkbox" type="checkbox" :value="value" @change="check" :checked="checked" /> -->
            </label>
        </div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="flex items-center text-gray-800">
            <!-- <div class="w-10 h-10 shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-2 sm:mr-3">
            <img class="ml-1" :src="service.image" width="20" height="20" :alt="service.service" />
            </div> -->
            <div class="font-medium text-sky-500">{{service.id}}</div>
        </div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div>{{service.title}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div>{{service.duration}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="text-left font-medium text-emerald-500">{{service.price}}</div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" >
              <button class="btn border-slate-200 hover:border-slate-300">
                <svg class="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>
              </button>
            </div>
        </td>
        <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
            <div class="inline-flex font-medium rounded-full text-center px-2.5 py-0.5" >
              <button class="btn border-slate-200 hover:border-slate-300">
                <svg class="w-4 h-4 fill-current text-red-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                </svg>
              </button>
            </div>
        </td>
    </tr>
    <!--
    Example of content revealing when clicking the button on the right side:
    Note that you must set a "colSpan" attribute on the <td> element,
    and it should match the number of columns in your table
    -->
    <tr :id="`description-${service.id}`" role="region" :class="!descriptionOpen && 'hidden'">
        <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">
        <div class="flex items-center bg-gray-50 p-3 -mt-3">
            <svg class="w-4 h-4 shrink-0 fill-current text-gray-400 mr-2">
            <path d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z" />
            </svg>
            <div class="italic">{{service.description}}</div>
        </div>
        </td>
    </tr>
    </tbody>
</template>

<script>

export default {
    name: 'ServicesTableItem',
    props: ['service', 'value', 'selected'],

    data: () => ({
        descriptionOpen: false,
    }),

    computed: {
        checked() {
            return false
            // return this.selected.includes(this.value)
        },
        statusValue() {
            return this.service.status ? 'Active' : 'Pending'
        }
    },

    methods: {
        check() {
            let updatedSelected = [...this.selected]
            if (this.checked) {
            updatedSelected.splice(updatedSelected.indexOf(this.value), 1)
            } else {
            updatedSelected.push(this.value)
            }
            this.$emit('update:selected', updatedSelected)
        },
        statusColor(status) {
            switch (status) {
                case 1:
                    return 'bg-green-100 text-green-600'
                case 0:
                    return 'bg-yellow-100 text-yellow-600'
                default:
                    return 'bg-gray-100 text-gray-500'
            }
        },
        changeStatus() {
            this.service.status = !this.service.status
        }
    },

}
</script>