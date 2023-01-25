## Анализатор кода для AVR ассемблера

Проект предназначен для людей, которые хотят проверить свой код на ассемблере на число clocks и opcode.

Пример вывода:
```
; Таблица переходов в обработчики прерываний.
    rjmp    irq_reset                       ; 0x0000  2
    rjmp    irq_dummy                       ; 0x0001  2
    rjmp    irq_dummy                       ; 0x0002  2
    rjmp    irq_tim_0_ovf                   ; 0x0003  2
    rjmp    irq_dummy                       ; 0x0004  2
    rjmp    irq_dummy                       ; 0x0005  2
    rjmp    irq_dummy                       ; 0x0006  2
    rjmp    irq_dummy                       ; 0x0007  2
    rjmp    irq_dummy                       ; 0x0008  2
    rjmp    irq_adc_conversion_complete     ; 0x0009  2

; Заглушка для неиспользуемых прерываний.
irq_dummy:
    rjmp    irq_dummy                                 2

; Начальная инициализация периферии.
irq_reset:

; Основной поток.
main_thread:
    rjmp    main_thread                               2

; Итерация программного UART и 
; счетчика времени.
irq_tim_0_ovf:
    reti                                              4 / 5

; Получение результата измерения и 
; запуск следующего.
irq_adc_conversion_complete:
    reti                                              4 / 5
```
## Как собрать и запустить проект

### Клонирование проекта
```
git clone git@github.com:Asubuhi824lia/AVR-counting.git
```

### Сборка
```
npm install package.json
```

### Запуск
```
npm run dev
```
Перейти по появившейся ссылке в консоли (Ctrl + ЛКМ).
