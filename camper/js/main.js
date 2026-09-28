// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // Header scroll shadow
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Slider function for camper cards
  document.querySelectorAll('.card-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    let currentIndex = 0;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        // swipe left
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      } else if (touchEndX - touchStartX > 40) {
        // swipe right
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      }
    }, { passive: true });
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Modal Detail Handling
  const modal = document.getElementById('detailsModal');
  const modalBody = document.getElementById('modalDetailsBody');
  const modalClose = document.querySelector('.modal-close');

  const camperDetailsData = {
    'fendt': {
      title: 'Кемпер Fendt (4-местный прицеп-дача)',
      price: 'от 4 000 ₽ / сутки',
      fullText: `
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🍳 Кухня:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Газовая плита на 3 конфорки</li>
          <li>Вытяжка и подсветка рабочей зоны</li>
          <li>Раковина с холодной и горячей водой (газовая колонка)</li>
          <li>Холодильник с морозильной камерой</li>
          <li>Емкость для чистой воды на 100 литров</li>
          <li>Полный набор кухонной утвари: кастрюля, сковорода, чайник, ножи, тарелки, приборы, кружки</li>
          <li>4 розетки 220В для вашей техники</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🛋 Салон и спальные места:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Просторный диван-трансформер, превращающийся в кровать 190 х 200 см</li>
          <li>Телевизор Smart TV с библиотекой фильмов</li>
          <li>Игровая консоль Dendy на двоих и настольные игры</li>
          <li>Постельное белье, одеяла, 3 подушки, пледы включены в комплект</li>
          <li>Кондиционер для жары и газовый камин для уютного тепла в прохладную погоду</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🚿 Санузел:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Душевая кабина с горячей водой</li>
          <li>Биотуалет Thetford</li>
          <li>Диспенсер с мылом, сушилка для белья, комплект чистых полотенец</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">⚡ Полная автономность:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Солнечная панель на 500 Вт на крыше</li>
          <li>Мощный литиевый аккумулятор LiFePO4 300 А·ч</li>
          <li>Инвертор 12В -> 220В мощностью 3000 Вт</li>
          <li>2 газовых баллона по 25 литров</li>
          <li>Удлинитель для зарядки от генератора или кемпинга</li>
        </ul>
      `
    },
    'caravan': {
      title: 'Караван Премиум (Комфортный автодом)',
      price: 'от 4 500 ₽ / сутки',
      fullText: `
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🍳 Кухня:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Газовая варочная поверхность</li>
          <li>Вытяжка, раковина с проточной водой</li>
          <li>Холодильник и автономная газовая колонка</li>
          <li>Бак для чистой воды 100 л</li>
          <li>Посуда и приборы на семью</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🛋 Салон и спальная зона:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Обеденная зона со столом, трансформирующаяся в 2-спальное место</li>
          <li>Отдельная стационарная кровать с ортопедическим спальным местом 160 х 200 см</li>
          <li>Сплит-система (климат-контроль)</li>
          <li>Smart TV + коллекция кинофильмов + приставка Dendy на 2 геймпада</li>
          <li>Постельное белье, 4 подушки, одеяла и пледы</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">🚿 Удобства и душ:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Полноценный душ (горячая вода от колонки)</li>
          <li>Кассетный биотуалет</li>
          <li>Мыло, полотенца, средства гигиены</li>
        </ul>
        <h4 style="margin: 15px 0 8px 0; color: #0f172a;">⚡ Автономное энергоснабжение:</h4>
        <ul style="padding-left: 20px; margin-bottom: 15px; color: #475569;">
          <li>Солнечная станция 500 Вт</li>
          <li>Литиевый аккумулятор 100 А·ч</li>
          <li>Инвертор 220V чистый синус 3000 Вт</li>
          <li>Газовый баллон 25 л</li>
        </ul>
      `
    }
  };

  document.querySelectorAll('.open-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const model = btn.getAttribute('data-model');
      const data = camperDetailsData[model];
      if (data && modal && modalBody) {
        modalBody.innerHTML = `
          <h2 style="font-size: 1.6rem; color: #0f172a; margin-bottom: 6px;">${data.title}</h2>
          <div style="font-weight: 700; color: #10b981; margin-bottom: 20px;">${data.price}</div>
          ${data.fullText}
          <div style="margin-top: 25px;">
            <a href="#booking" class="btn-primary modal-book-btn" style="width: 100%; text-align: center; justify-content: center;">Забронировать этот кемпер</a>
          </div>
        `;
        modal.classList.add('open');
        modal.querySelector('.modal-book-btn').addEventListener('click', () => {
          modal.classList.remove('open');
        });
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  // Booking Form handling
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const camper = document.getElementById('camperModel').value;
      const dates = document.getElementById('rentalDates').value;
      const name = document.getElementById('userName').value;
      const phone = document.getElementById('userPhone').value;

      const message = `Здравствуйте! Заявка на аренду кемпера с сайта camper.sapog-host.ru:\n- Модель: ${camper}\n- Даты/Срок: ${dates}\n- Имя: ${name}\n- Телефон: ${phone}`;
      
      // Redirect or open WhatsApp
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/79000000000?text=${encodedMsg}`, '_blank');
      alert('Спасибо за заявку! Мы свяжемся с вами в течение 10 минут.');
    });
  }
});
