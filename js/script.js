window.onload = function() {
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
  
};