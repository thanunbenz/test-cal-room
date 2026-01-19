const res = document.getElementById('res');
const input = document.getElementById('input');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const btn = document.getElementById('btn');
const selectSize = document.getElementById('select-size');
res.style.display = 'none';

function calaroomrea(rooms, width, length) {
    if (rooms <= 0 || width <= 0 || length <= 0) {
        throw new Error('Invalid input');
    }

    const area = (width / 100) * (length / 100);
    const reqarea = rooms / area;

    return {
        area: Number(area.toFixed(4)),
        reqarea: Math.ceil(reqarea)
    };
}

// 50*50
//50/100 = 0.5 * 0.5 = 0.25
//30/0.25 = 120


if (selectSize) {
    selectSize.addEventListener('change', () => {
        const selectedValue = selectSize.value;
        let dimensions = '';
        switch (selectedValue) {
            case '1':
                dimensions = '50*50';
                break;
            case '2':
                dimensions = '60*60';
                break;
            case '3':
                dimensions = '100*100';
                break;
            default:
                dimensions = '';
        }
        if (dimensions) {
            const [width, height] = dimensions.split('*');
            widthInput.value = width;
            heightInput.value = height;
        } else {
            widthInput.value = '';
            heightInput.value = '';
        }
    });
}


btn.addEventListener('click', () => {
    const rooms = parseFloat(input.value.trim());
    const width = parseFloat(widthInput.value);
    const length = parseFloat(heightInput.value);

    if (!rooms || !width || !length) {
        res.style.display = 'none';
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    const result = calaroomrea(rooms, width, length);
    res.style.display = 'block';
    res.innerHTML = `
            <div>พื้นที่ห้อง: ${rooms} ตร.ม</div>
            <div>ขนาดกระเบื้อง: ${width} x ${length} ซม</div>
            <div>พื้นที่กระเบื้อง 1 แผ่น: ${result.area} ตร.ม</div>
            <div><strong>จำนวนกระเบื้องที่ต้องใช้: ${result.reqarea} แผ่น</strong></div>
        `
});