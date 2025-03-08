<template>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top fw-bolder navbar-animation">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2" href="#">Portfolio Website</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between " id="navbarNav">
                <ul class="navbar-nav mx-auto list-animation">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Student</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#subject">Subject</a>
                    </li>
                </ul>
                <div>
                    <div>
                        <a href="#" class="btn btn-outline-info border-3 d-flex align-items-center gap-2 fw-bold btn-cyan">
                            6630200071
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                                <path d="M10.8102 4.80003H1.5C1.31435 4.80003 1.1363 4.87378 1.00503 5.00506C0.87375 5.13633 0.8 5.31438 0.8 5.50003C0.8 5.68569 0.87375 5.86373 1.00503 5.99501C1.1363 6.12628 1.31435 6.20003 1.5 6.20003H10.8102L7.50484 9.50485L7.50483 9.50486C7.3735 9.63619 7.29972 9.81431 7.29972 10C7.29972 10.1858 7.3735 10.3639 7.50483 10.4952C7.63616 10.6265 7.81427 10.7003 8 10.7003C8.18573 10.7003 8.36384 10.6265 8.49517 10.4952L12.9951 5.99528L12.9952 5.99521L12.8538 5.85378L10.8102 4.80003ZM10.8102 4.80003L7.50484 1.49522L7.50483 1.49521C7.3735 1.36388 7.29972 1.18576 7.29972 1.00003C7.29972 0.814309 7.3735 0.63619 7.50483 0.504862C7.63616 0.373535 7.81427 0.299756 8 0.299756C8.18573 0.299756 8.36384 0.373535 8.49517 0.504863L12.9951 5.00478L12.9952 5.00486L10.8102 4.80003Z" fill="white" stroke="white" stroke-width="0.4"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.btn-cyan { --btn-color: #0dcaf0 }

.navbar-animation {
    animation: dropDown 2s ease-in-out;
}

.list-animation {
    animation: dropDown 4s ease-in-out;
}

.btn-cyan {
    animation: neonBorder 1.5s infinite alternate;
}

a:hover {
    color: white;
    transition: scale 0.5s;
    scale: 1.05;
}
</style>