import store$ from "./useStore.tsx";

export const FlushToken = () => {
    let model = store$.get()
    if (model.user_model.Token){
        model.user_model.RefreshToken();
        store$.set(model)
    }
}
