window.onload = function() {
  // AOS
  AOS.init();
  // 메뉴 기능
  const nav = document.querySelector(".nav");
  const btMenu = document.querySelector(".bt-menu");
  const navClose = document.querySelector(".nav-close");
  btMenu.addEventListener("click", function() {
    // 클래스를 nav에 추가
    nav.classList.add("nav-active");
  });
  navClose.addEventListener("click", function() {
    // 클래스를 nav에 삭제
    nav.classList.remove("nav-active")
  });
  // nav 영역을 벗어나는 이벤트 발생 처리
  nav.addEventListener("mouseleave", function() {
    nav.classList.remove("nav-active");
  });
  // 스크롤 기능
  // 스크롤바의 상단 위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector(".header");
  let logoW = document.querySelector(".logo-w");
  let logoG = document.querySelector(".logo-g");
  header.addEventListener("mouseenter", function() {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  });
  header.addEventListener("mouseleave", function() {
    if (scy < scActive) {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  // 새로고침 시 적용
  if (scy > scActive) {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  }
  window.addEventListener("scroll", function() {
    scy = window.document.documentElement.scrollTop;
    console.log(scy);
    if (scy > scActive) {
      header.classList.add("header-active");
      logoW.style.display = "none";
      logoG.style.display = "block";
    } else {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  // 펼침 언어 기능
  const langWord = document.querySelector(".language-word");
  const language = document.querySelector(".language");
  const languageLi = document.querySelector(".language li");
  setTimeout(function() {
    languageLi.style.transition = "all 0.2s"
  }, 500);
  langWord.addEventListener("click", function() {
    language.classList.toggle("language-box-active");
  });
  // 비디오 항목을 체크(video 태그로 파악)
  // 모든 비디오태그 videos변수 저장
  let videos = document.querySelectorAll(".swVisual video");
  // console.log(video);
  // 비디오 시간 체크
  // 비디오 재생시간을 보관할 배열 생성
  let videosTimeArr = [];
  for (let i = 0; i < videosTimeArr.length; i++) {
    // 시간을 보관
    videosTimeArr[i] = Math.ceil(videos[i].duration);
  }
  // console.log(videosTimeArr);
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  videos[videoIndex].play();
  // visual slide
  // 스와이퍼 슬라이드 초기화
  let swVisual = new Swiper(".swVisual", {
    loop:true,
  });
  // 슬라이드 변경 이벤트 시 처리
  swVisual.on("slideChange", function() {
    // 진행중인 비디오 멈춤
    videos[videoIndex].pause();
    // 다음 화면에 보이는 swiper 슬라이드 번호
    videoIndex = swVisual.realIndex;
    // 다음 비디오 재생
    // 현재보이는 슬라이드에 해당하는 비디오의 재생시간을 처음설정
    // 이 속성을 조작해서 비디오 재생 위치 변경
    // 다음 슬라이드로 이동할 때마다 비디오를 처음부터 재생하기 위한 부분
    videos[videoIndex].currentTime = 0;
    const playPromise = videos[videoIndex].play();
    if (playPromise !== undefined) {
      playPromise.then((_)=> {}).catch((error)=>{})
    }
    // 방어코드
    clearInterval(videoTimer);
    videoReset();
  });
  // 비디오 영상이 플레이가 끝나면 다음 슬라이드로 이동
  // 늘어나는 흰색bar
  let bars = document.querySelectorAll(".bar");
  // 늘어나는 길이를 위한 값(최대 100)
  let barScaleW = 0;
  // 타이머 생성
  // 비디오 타이머 초기화 및 설정
  let videoTimer;
  function videoReset() {
    // 처음에는 0%로 만들려고 한다
    barScaleW = 0;
    // 최초의 bar를 초기화
    for (let i = 0; i < bars.length; i++) {
      let tag = bars[i];
      tag.style.width = `${barScaleW}%`;
    }
    // 활성화 될 때 bar 클래스 선택
    let activeBar = bars[videoIndex];
    clearInterval(videoTimer);
    let videoTime = videosTimeArr[videoIndex];
    videoTimer = setInterval(() => {
      barScaleW++;
      activeBar.style.width = `${barScaleW}%`;
      if (barScaleW >= 100) {
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
    }, videoTime * 10);
  };
  videoReset();
  const visualControlLi = document.querySelectorAll(".visual-control > li");
  visualControlLi.forEach((item, index) => {
    item.addEventListener("click", function() {
      videoIndex = index;
      swVisual.slideTo(videoIndex)
    });
  });
  // 비지니스 슬라이드
  const swBusiness = new Swiper(".swBusiness", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  })
};