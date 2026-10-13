Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Helper function to create rounded rectangle path
function Get-RoundedRectanglePath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

# Helper function for arch path (top rounded, bottom subtle rounded)
function Get-ArchPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$topR, [float]$botR) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $dt = $topR * 2
    $db = $botR * 2
    $path.AddArc($x, $y, $dt, $dt, 180, 90)
    $path.AddArc($x + $w - $dt, $y, $dt, $dt, 270, 90)
    $path.AddArc($x + $w - $db, $y + $h - $db, $db, $db, 0, 90)
    $path.AddArc($x, $y + $h - $db, $db, $db, 90, 90)
    $path.CloseFigure()
    return $path
}

# Helper to draw cute cherry blossom flower
function Draw-Flower([System.Drawing.Graphics]$g, [float]$cx, [float]$cy, [float]$radius) {
    $petalCol = [System.Drawing.ColorTranslator]::FromHtml("#FB7185")
    $centerCol = [System.Drawing.ColorTranslator]::FromHtml("#FBBF24")
    
    for ($i = 0; $i -lt 5; $i++) {
        $angle = $i * (360 / 5) * [Math]::PI / 180
        $px = $cx + [Math]::Cos($angle) * ($radius * 0.6)
        $py = $cy + [Math]::Sin($angle) * ($radius * 0.6)
        $pBrush = New-Object System.Drawing.SolidBrush($petalCol)
        $g.FillEllipse($pBrush, ($px - $radius * 0.48), ($py - $radius * 0.48), ($radius * 0.96), ($radius * 0.96))
        $pBrush.Dispose()
    }
    $cBrush = New-Object System.Drawing.SolidBrush($centerCol)
    $g.FillEllipse($cBrush, ($cx - $radius * 0.35), ($cy - $radius * 0.35), ($radius * 0.7), ($radius * 0.7))
    $cBrush.Dispose()
}

# 1. Background Gradient
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, 
    [System.Drawing.ColorTranslator]::FromHtml("#FFF1F2"), 
    [System.Drawing.ColorTranslator]::FromHtml("#FFFDF9"), 
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal)
$g.FillRectangle($bgBrush, $rect)
$bgBrush.Dispose()

# 2. Outer decorative border
$outerPath = Get-RoundedRectanglePath 16 16 1168 598 32
$outerPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FDA4AF"), 3)
$g.DrawPath($outerPen, $outerPath)
$outerPen.Dispose()
$outerPath.Dispose()

# Inner dashed decorative border
$innerPath = Get-RoundedRectanglePath 26 26 1148 578 24
$innerPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FB7185"), 1.5)
$innerPen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
$g.DrawPath($innerPen, $innerPath)
$innerPen.Dispose()
$innerPath.Dispose()

# Corner decorative flowers
Draw-Flower $g 45 45 16
Draw-Flower $g 1155 45 16
Draw-Flower $g 1155 585 16
Draw-Flower $g 45 585 16

# 3. Main Baby Photo Frame (Arch shape)
$photoX = 52
$photoY = 56
$photoW = 356
$photoH = 518

# Photo shadow
$shadowPath = Get-ArchPath ($photoX + 6) ($photoY + 8) $photoW $photoH 178 28
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 225, 29, 72))
$g.FillPath($shadowBrush, $shadowPath)
$shadowBrush.Dispose()
$shadowPath.Dispose()

# White frame border
$borderPath = Get-ArchPath ($photoX - 6) ($photoY - 6) ($photoW + 12) ($photoH + 12) 184 34
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillPath($whiteBrush, $borderPath)
$borderPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FECDD3"), 2.5)
$g.DrawPath($borderPen, $borderPath)
$borderPen.Dispose()
$borderPath.Dispose()
$whiteBrush.Dispose()

# Draw Baby Photo Inside Arch
$archPath = Get-ArchPath $photoX $photoY $photoW $photoH 178 28
$savedState = $g.Save()
$g.SetClip($archPath)

$babyImg1 = [System.Drawing.Image]::FromFile((Resolve-Path "Ảnh\2.png"))
# Fit and crop baby-1 (focusing on upper-center: face)
$srcW = $babyImg1.Width
$srcH = [int]($srcW * ($photoH / $photoW))
$srcY = [int]($babyImg1.Height * 0.08)
if ($srcY + $srcH -gt $babyImg1.Height) { $srcH = $babyImg1.Height - $srcY }
$srcRect = New-Object System.Drawing.Rectangle(0, $srcY, $srcW, $srcH)
$dstRect = New-Object System.Drawing.Rectangle($photoX, $photoY, $photoW, $photoH)
$g.DrawImage($babyImg1, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$babyImg1.Dispose()

$g.Restore($savedState)
$archPath.Dispose()

# 4. Secondary Inset Photo (Cake photo - circular sticker on bottom right of arch)
$circleX = 295
$circleY = 405
$circleSize = 145

# Circle shadow
$circShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 0, 0, 0))
$g.FillEllipse($circShadow, ($circleX + 4), ($circleY + 6), $circleSize, $circleSize)
$circShadow.Dispose()

# Circle white border
$circBorderBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillEllipse($circBorderBrush, ($circleX - 6), ($circleY - 6), ($circleSize + 12), ($circleSize + 12))
$circBorderBrush.Dispose()
$circBorderPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FECDD3"), 2.5)
$g.DrawEllipse($circBorderPen, ($circleX - 6), ($circleY - 6), ($circleSize + 12), ($circleSize + 12))
$circBorderPen.Dispose()

# Draw secondary photo in circle
$circPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$circPath.AddEllipse($circleX, $circleY, $circleSize, $circleSize)
$savedState2 = $g.Save()
$g.SetClip($circPath)
$babyImg4 = [System.Drawing.Image]::FromFile((Resolve-Path "Ảnh\4.png"))
$circDst = New-Object System.Drawing.Rectangle($circleX, $circleY, $circleSize, $circleSize)
$g.DrawImage($babyImg4, $circDst)
$babyImg4.Dispose()
$g.Restore($savedState2)
$circPath.Dispose()

# 5. Right Content Section
$textLeft = 465
$currentY = 58

# Top Badge Pill
$badgePath = Get-RoundedRectanglePath $textLeft $currentY 450 36 18
$badgeBg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#FFF1F2"))
$g.FillPath($badgeBg, $badgePath)
$badgeBg.Dispose()
$badgeBorder = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FECDD3"), 1.5)
$g.DrawPath($badgeBorder, $badgePath)
$badgeBorder.Dispose()
$badgePath.Dispose()

$badgeFont = New-Object System.Drawing.Font("Segoe UI", 11.5, [System.Drawing.FontStyle]::Bold)
$badgeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#991B1B"))
$g.DrawString("LỄ THÔI NÔI  •  HAPPY 1ST BIRTHDAY", $badgeFont, $badgeBrush, ($textLeft + 42), ($currentY + 8))
$badgeFont.Dispose()
$badgeBrush.Dispose()

$currentY += 50

# Intro Line
$introFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$introBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#881337"))
$g.DrawString("TRÂN TRỌNG KÍNH MỜI ĐẾN DỰ BUỔI TIỆC MỪNG", $introFont, $introBrush, $textLeft, $currentY)
$introFont.Dispose()
$introBrush.Dispose()

$currentY += 28

# Baby Name (Majestic Display)
$nameFont = New-Object System.Drawing.Font("Georgia", 52, [System.Drawing.FontStyle]::Bold)
$nameBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#991B1B"))
$g.DrawString("Dương An Khánh", $nameFont, $nameBrush, ($textLeft - 4), $currentY)
$nameFont.Dispose()
$nameBrush.Dispose()

$currentY += 86

# Nickname & Age Tags
$nickFont = New-Object System.Drawing.Font("Georgia", 22, [System.Drawing.FontStyle]::Italic)
$nickBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E11D48"))
$g.DrawString("Bé Gạo", $nickFont, $nickBrush, $textLeft, $currentY)
$nickFont.Dispose()
$nickBrush.Dispose()

# Cute drawn flower next to Bé Gạo
Draw-Flower $g ($textLeft + 120) ($currentY + 16) 13

# Age pill
$agePath = Get-RoundedRectanglePath ($textLeft + 155) ($currentY + 2) 175 32 16
$ageBg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#FEF3C7"))
$g.FillPath($ageBg, $agePath)
$ageBg.Dispose()
$ageBorder = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FDE68A"), 1.2)
$g.DrawPath($ageBorder, $agePath)
$ageBorder.Dispose()
$agePath.Dispose()

$ageFont = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Bold)
$ageBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#92400E"))
$g.DrawString("Mừng Tròn 1 Tuổi", $ageFont, $ageBrush, ($textLeft + 180), ($currentY + 7))
$ageFont.Dispose()
$ageBrush.Dispose()

$currentY += 48

# Information Card Box
$boxW = 680
$boxH = 142
$boxPath = Get-RoundedRectanglePath $textLeft $currentY $boxW $boxH 20

# Box Shadow
$boxShadow = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 225, 29, 72))
$shadowBoxPath = Get-RoundedRectanglePath ($textLeft + 3) ($currentY + 4) $boxW $boxH 20
$g.FillPath($boxShadow, $shadowBoxPath)
$boxShadow.Dispose()
$shadowBoxPath.Dispose()

# Box Fill
$boxBg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillPath($boxBg, $boxPath)
$boxBg.Dispose()
$boxBorder = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FFE4E8"), 2)
$g.DrawPath($boxBorder, $boxPath)
$boxBorder.Dispose()
$boxPath.Dispose()

# Info Box Contents
$boxInnerY = $currentY + 16

# Row 1: Time & Date
$timeLabelFont = New-Object System.Drawing.Font("Segoe UI", 12.5, [System.Drawing.FontStyle]::Bold)
$timeLabelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E11D48"))
$g.DrawString("THỜI GIAN:", $timeLabelFont, $timeLabelBrush, ($textLeft + 20), $boxInnerY)
$timeLabelFont.Dispose()
$timeLabelBrush.Dispose()

$timeValueFont = New-Object System.Drawing.Font("Segoe UI", 14.5, [System.Drawing.FontStyle]::Bold)
$timeValueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#991B1B"))
$g.DrawString("11 Giờ 00 Sáng  •  Chủ Nhật, 18.10.2026", $timeValueFont, $timeValueBrush, ($textLeft + 138), ($boxInnerY - 2))
$timeValueFont.Dispose()
$timeValueBrush.Dispose()

$lunarFont = New-Object System.Drawing.Font("Segoe UI", 11.5, [System.Drawing.FontStyle]::Regular)
$lunarBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#64748B"))
$g.DrawString("(09.09 ÂL)", $lunarFont, $lunarBrush, ($textLeft + 575), ($boxInnerY + 1))
$lunarFont.Dispose()
$lunarBrush.Dispose()

# Divider line inside box
$divPen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#FFF1F2"), 1.5)
$g.DrawLine($divPen, ($textLeft + 20), ($boxInnerY + 38), ($textLeft + $boxW - 20), ($boxInnerY + 38))
$divPen.Dispose()

# Row 2: Location
$locLabelFont = New-Object System.Drawing.Font("Segoe UI", 12.5, [System.Drawing.FontStyle]::Bold)
$locLabelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E11D48"))
$g.DrawString("ĐỊA ĐIỂM:", $locLabelFont, $locLabelBrush, ($textLeft + 20), ($boxInnerY + 48))
$locLabelFont.Dispose()
$locLabelBrush.Dispose()

$locValFont = New-Object System.Drawing.Font("Segoe UI", 13.5, [System.Drawing.FontStyle]::Bold)
$locValBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#1E293B"))
$g.DrawString("Tư Gia", $locValFont, $locValBrush, ($textLeft + 138), ($boxInnerY + 46))
$locValFont.Dispose()

$addrFont = New-Object System.Drawing.Font("Segoe UI", 12.5, [System.Drawing.FontStyle]::Regular)
$addrBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#475569"))
$g.DrawString("Khóm Hóa Thành, Phường Đông Thành, TX Bình Minh, Vĩnh Long", $addrFont, $addrBrush, ($textLeft + 138), ($boxInnerY + 72))
$addrFont.Dispose()
$addrBrush.Dispose()
$locValBrush.Dispose()

$currentY += 156

# Inviter Signature Line (Clean and un-overlapped)
$inviterFont = New-Object System.Drawing.Font("Segoe UI", 13.5, [System.Drawing.FontStyle]::Regular)
$inviterBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#64748B"))
$g.DrawString("Kính mời bởi:  ", $inviterFont, $inviterBrush, $textLeft, $currentY)

$parentsFont = New-Object System.Drawing.Font("Segoe UI", 14, [System.Drawing.FontStyle]::Bold)
$parentsBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#881337"))
$g.DrawString("Ba Trung  &  Mẹ Hon", $parentsFont, $parentsBrush, ($textLeft + 120), ($currentY - 1))

$welcomeFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Italic)
$g.DrawString("  —  Rất hân hạnh được đón tiếp Quý khách!", $welcomeFont, $inviterBrush, ($textLeft + 315), $currentY)

$inviterFont.Dispose()
$inviterBrush.Dispose()
$parentsFont.Dispose()
$parentsBrush.Dispose()
$welcomeFont.Dispose()

# Save High Quality JPEG & PNG
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

$publicJpg = "public\og-image.jpg"
$bmp.Save($publicJpg, $jpegCodec, $encoderParams)
$imageJpg = "image\og-image.jpg"
$bmp.Save($imageJpg, $jpegCodec, $encoderParams)

# Also save PNG version
$bmp.Save("public\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("image\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Refined banner generated successfully: $publicJpg"

$g.Dispose()
$bmp.Dispose()
