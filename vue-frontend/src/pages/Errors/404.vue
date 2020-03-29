<template>
    <div class="page-not-found-container">
        <div class="content">
            <section>
                <img src="../../assets/logo.svg" alt="Be The Hero"/>
                <h1>404</h1>
                <p>
                    A página que procura não existe.
                </p>
            </section>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PageNotFound',
}
</script>

<style scoped>
.page-not-found-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.page-not-found-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-not-found-container .content section {
    width: 100%;
    text-align: center;
}

.page-not-found-container .content section h1 {
    margin: 20px 0 32px;
    font-size: 60px;
}

.page-not-found-container .content section p {
    font-size: 18px;
    color: #737380;
}
</style>