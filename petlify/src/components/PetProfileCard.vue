<script setup>
import ButtonNew from '../components/ButtonNew.vue'
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/users';
import { usePetStores } from '../stores/pets';

const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()
const petStore = usePetStores()

const goToEditPet = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id

    router.push('/editPet')
}

const props = defineProps({
    petName: {
        type: String
    },
    age: {
        type: String
    },
    dateOfBirth: {
        type: String
    }, 
    species: {
        type: String
    },
    breed: {
        type: String
    },
    colour: {
        type: String
    },
    weight: {
        type: Number
    }
})

const emits = defineEmits(['petProfileClicked', 'editPetClicked'])

const handleCardClick = () => {
    emits('petProfileClicked')
}

const handleEditPetClick = (event) => {
    event.stopPropagation()
    emits('editPetClicked')
}

const getAge = computed(() => {
    const birthDate = new Date(props.dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1
    }

    return age
})

</script>

<template>
    <div class="border border-black rounded-xl h-full w-80 flex flex-col items-center hover:cursor-pointer" @click="handleCardClick">
        <div class="rounded-t-xl p-4 h-64 w-full border border-slate-100">
            <img src="../assets/illustrations//purr-traveler-cat.png " alt=""
                class="object-contain h-full w-full rounded-t-xl"
            >
        </div>

        <div class="w-full inline-block px-2">

            <div class="my-2 justify-self-end text-right hover:underline" @click="handleEditPetClick">
                <label class="font-light text-xs hover:cursor-pointer">Edit Pet</label>
            </div>

            <div class="flex flex-col gap-4 mt-2 mb-6">
                <!-- Details -->
                <div class="flex flex-row items-center gap-2 mb-4">
                    <label class="font-semibold text-2xl">{{ petName }}</label>
                    <label class="text-sm">{{ getAge }} years old</label>
                </div>

                <!-- Date Of Birth -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-md">D.O.B</label>
                    <label class="w-2/3 text-left">{{ dateOfBirth }}</label>
                </div>

                <!-- Species -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-md">Species</label>
                    <label class="w-2/3 text-left">{{ species }}</label>
                </div>

                <!-- Breed -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-md">Breed</label>
                    <label class="w-2/3 text-left">{{ breed }}</label>
                </div>

                <!-- Color -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-md">Colour</label>
                    <label class="w-2/3">{{ colour }}</label>
                </div>

                <!-- Weight -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-md">Weight (KG)</label>
                    <label class="w-2/3 text-left">{{ weight}}</label>
                </div>

            </div>
            
        </div>
        <ButtonNew text="Make an appointment" rounded="lg" elevation="0" size="large"/>
    </div>
</template>