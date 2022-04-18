const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},

    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [{
            name: "DARARI",
            singer: "TREASURE",
            path: "./music/Darari-TREASUREBoyband-7130169.mp3",
            image: "./img/maxresdefault.jpg"
        },
        {
            name: "Ánh Nắng Của Anh",
            singer: "Đức Phúc",
            path: "./music/Anh-Nang-Cua-Anh-Cho-Em-Den-Ngay-Mai-OST-Duc-Phuc.mp3",
            image: "./img/Tab Harmonica - Ánh Nắng Của Anh (Chờ Em Đến Ngày Mai OST) - Duc Phuc.png"
        },
        {
            name: "Muộn Rồi Mà Sao Còn",
            singer: "Sơn Tùng- MTP",
            path: "./music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3",
            image: "./img/ab67616d0000b27329f906fe7a60df7777b02ee1.jpg"
        },
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./music/NangTho-HoangDung-6413381.mp3",
            image: "./img/nangtho.jpg"
        },
        {
            name: "Gone",
            singer: "Rosé",
            path: "./music/Gone-ROSE-6964052.mp3",
            image: "./img/gone.jpg"
        },
        {
            name: "Có Hẹn Với Thanh Xuân",
            singer: "Monstar",
            path: "./music/cohenvoithanhxuan-MONSTAR-7050201.mp3",
            image: "./img/thanhxuan.jpg"
                // image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
            name: "MONEY   ",
            singer: "LISA",
            path: "./music/Money-LISA-7086698.mp3",
            image: "./img/money.webp"
        },
        {
            name: "Có Điều Gì Sao Không Nói Cùng Anh",
            singer: "Trung Quân Idol",
            path: "./music/Co-Dieu-Gi-Sao-Khong-Noi-Cung-Anh-Live-In-HOA-Concert-Trung-Quan-Idol.mp3",
            image: "./img/65fa3b325f95866bc5251c041f223643.jpg"
        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hoàng Duyên",
            path: "./music/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3",
            image: "./img/SG.jpeg"
        }
    ],
    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })
        playlist.innerHTML = htmls.join('\n')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
        playBtn.onclick = function() {
            if (_this.isPlaying) {

                audio.pause()

            } else {

                audio.play();

            }

        }
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add("playing")
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    start: function() {
        this.defineProperties();
        this.handleEvents()
        this.loadCurrentSong();
        this.render()
    }
}
app.start()